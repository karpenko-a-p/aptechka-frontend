import 'server-only';
import { createClient } from 'redis';
import { Environment } from 'server/services/Environment';
import { Logger } from 'server/services/Logger';

const redisClient = await createClient({ url: Environment.CACHE_CONNECTION_STRING })
  .on('error', (err) => Logger.error('Redis error:', err))
  .on('connection', () => Logger.info('New redis connection'))
  .connect();

export abstract class DistributedCache {
  static readonly ONE_MINUTE = DistributedCache.minutes(1);
  static readonly TEN_MINUTES = DistributedCache.minutes(10);
  static readonly HALF_HOUR = DistributedCache.minutes(30);
  static readonly ONE_HOUR = DistributedCache.hours(1);
  static readonly THREE_HOURS = DistributedCache.hours(3);
  static readonly SIX_HOURS = DistributedCache.hours(6);
  static readonly ONE_DAY = DistributedCache.days(1);
  static readonly ONE_WEEK = DistributedCache.days(7);

  // Получить из кэша
  static async get<TPayload>(key: string): Promise<Nilable<TPayload>> {
    const payload = await redisClient.get(key);
    return payload ? JSON.parse(payload) : null;
  }

  // Установить в кэш
  static async set(key: string, payload: unknown, ttl = this.ONE_MINUTE): Promise<void> {
    await redisClient.setEx(key, ttl, JSON.stringify(payload));
  }

  // Кэширование с тегами
  static async setWithTags(key: string, payload: unknown, tags: string[], ttl = this.ONE_MINUTE): Promise<void> {
    // Используем pipeline для атомарности операций
    const pipeline = redisClient.multi();

    // Сохраняем основное значение
    pipeline.setEx(key, ttl, JSON.stringify(payload));

    // Сохраняем связь ключа с тегами
    tags.forEach((tag) => pipeline.sAdd(`tag:${tag}`, key));

    await pipeline.exec();
  }

  // Инвалидация кэша
  static async invalidate(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length) await redisClient.del(keys);
  }

  // Инвалидация по тегу
  static async invalidateByTag(tag: string): Promise<void> {
    const tagKey = `tag:${tag}`;

    // Получаем все ключи ассоциированные с тегом
    const keys = await redisClient.sMembers(tagKey);

    if (!keys.length) return;

    await Promise.all([redisClient.del(keys), redisClient.del(tagKey)]);
  }

  // Минуты
  static minutes(mins: number): number {
    return mins * 60;
  }

  // Часы
  static hours(hours: number): number {
    return hours * 60 * 60;
  }

  // дни
  static days(days: number): number {
    return days * 24 * 60 * 60;
  }
}
