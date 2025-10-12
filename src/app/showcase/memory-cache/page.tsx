import React, { JSX } from 'react';
import { MemoryCache } from 'server/cache/MemoryCache';

interface CacheSample {
  timestamp: Date;
}

export default function Page(): JSX.Element {
  let cachedValue = MemoryCache.get<CacheSample>('sample-value');

  if (!cachedValue) {
    cachedValue = { timestamp: new Date() };
    MemoryCache.set('sample-value', cachedValue, MemoryCache.cacheForMinutes(1));
  }

  return <p>Cache date: {cachedValue.timestamp.toISOString()}</p>;
}
