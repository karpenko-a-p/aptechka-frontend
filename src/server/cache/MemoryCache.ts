import 'server-only';
import { LRUCache } from 'lru-cache';

const lruCache = new LRUCache({
  allowStale: false, // не возвращать просроченные данные
  max: 1000, // максимальное количество элементов
  maxSize: 100 * 1024 * 1024, // 100MB максимальный размер
  ttl: 1000 * 60 * 60, // час по умолчанию
  sizeCalculation(value: unknown, key: string): number {
    // Расчет размера в байтах
    if (Buffer.isBuffer(value)) return value.length;
    return JSON.stringify(value).length + key.length;
  },
});

export abstract class MemoryCache {
  static readonly ONE_MINUTE = MemoryCache.minutes(1);
  static readonly TEN_MINUTES = MemoryCache.minutes(10);
  static readonly HALF_HOUR = MemoryCache.minutes(30);
  static readonly ONE_HOUR = MemoryCache.hours(1);
  static readonly THREE_HOURS = MemoryCache.hours(3);
  static readonly SIX_HOURS = MemoryCache.hours(6);
  static readonly ONE_DAY = MemoryCache.days(1);
  static readonly ONE_WEEK = MemoryCache.days(7);

  static set(key: string, value: unknown, ttl?: number): void {
    lruCache.set(key, value as object, { ttl });
  }

  static get<TPayload>(key: string): Nilable<TPayload> {
    return lruCache.get(key) as Nilable<TPayload>;
  }

  static has(key: string): boolean {
    return lruCache.has(key);
  }

  static delete(key: string): void {
    lruCache.delete(key);
  }

  static clear(): void {
    lruCache.clear();
  }

  // Минуты
  static minutes(mins: number): number {
    return mins * 60 * 1000;
  }

  // Часы
  static hours(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  // дни
  static days(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }
}
