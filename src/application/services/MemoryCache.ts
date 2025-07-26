import { Service } from 'typedi';
import 'server-only';

class CachedValue {
  constructor(
    public readonly value: unknown,
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

@Service()
export class MemoryCache {
  private readonly cache = new Map<string, CachedValue>();

  constructor() {
    setInterval(() => this.invalidate(), 60_000);
  }

  cacheForMinutes(minutes: number): number {
    return Date.now() + 1000 * 60 * minutes;
  }

  cacheForHours(hours: number): number {
    return Date.now() + 1000 * 60 * 60 * hours;
  }

  cacheForDays(days: number): number {
    return Date.now() + 1000 * 60 * 60 * 24 * days;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  get<TValue>(key: string): Nullable<TValue> {
    const cachedValue = this.cache.get(key);

    if (!cachedValue) return null;

    if (cachedValue.expired) {
      this.deleteByKey(key);
      return null;
    }

    return cachedValue.value as TValue;
  }

  set(key: string, value: unknown, expiresAt?: number, tags?: string[]): void {
    const cachedValue = new CachedValue(value, expiresAt ?? this.cacheForMinutes(10), tags ?? []);

    if (!cachedValue.expired) this.cache.set(key, cachedValue);
  }

  deleteByKey(key: string): void {
    this.cache.delete(key);
  }

  deleteByTag(tag: string): void {
    this.cache.entries().forEach(([key, cachedValue]) => {
      if (cachedValue.hasTag(tag)) this.deleteByKey(key);
    });
  }

  invalidate(): void {
    this.cache.entries().forEach(([key, cachedValue]) => {
      if (cachedValue.expired) this.deleteByKey(key);
    });
  }
}
