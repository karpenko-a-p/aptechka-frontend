import 'server-only';

class CachedValue {
  constructor(
    readonly value: unknown,
    private readonly expiresAt: number,
    private readonly tags: string[],
  ) {}

  get expired(): boolean {
    return this.expiresAt < Date.now();
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }
}

export abstract class MemoryCache {
  private static readonly cache = new Map<string, CachedValue>();

  static cacheForMinutes(minutes: number): number {
    return Date.now() + 1000 * 60 * minutes;
  }

  static cacheForHours(hours: number): number {
    return Date.now() + 1000 * 60 * 60 * hours;
  }

  static cacheForDays(days: number): number {
    return Date.now() + 1000 * 60 * 60 * 24 * days;
  }

  static has(key: string): boolean {
    return MemoryCache.cache.has(key);
  }

  static get<TValue>(key: string): Nullable<TValue> {
    const cachedValue = MemoryCache.cache.get(key);

    if (!cachedValue) return null;

    if (cachedValue.expired) {
      MemoryCache.deleteByKey(key);
      return null;
    }

    return cachedValue.value as TValue;
  }

  static set(key: string, value: unknown, expiresAt?: number, tags?: string[]): void {
    const cachedValue = new CachedValue(value, expiresAt ?? MemoryCache.cacheForMinutes(10), tags ?? []);

    if (!cachedValue.expired) MemoryCache.cache.set(key, cachedValue);
  }

  static deleteByKey(key: string): void {
    MemoryCache.cache.delete(key);
  }

  static deleteByTag(tag: string): void {
    MemoryCache.cache.entries().forEach(([key, cachedValue]) => {
      if (cachedValue.hasTag(tag)) MemoryCache.deleteByKey(key);
    });
  }

  static invalidate(): void {
    MemoryCache.cache.entries().forEach(([key, cachedValue]) => {
      if (cachedValue.expired) MemoryCache.deleteByKey(key);
    });
  }
}

setInterval(MemoryCache.invalidate, 60_000);
