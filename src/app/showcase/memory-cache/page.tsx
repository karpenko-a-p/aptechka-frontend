import React, { JSX } from 'react';
import { Container } from 'typedi';
import { MemoryCache } from 'application/services';

const memoryCache = Container.get(MemoryCache);

interface CacheSample {
  timestamp: Date;
}

export default function Page(): JSX.Element {
  let cachedValue = memoryCache.get<CacheSample>('sample-value');

  if (!cachedValue) {
    cachedValue = { timestamp: new Date() };
    memoryCache.set('sample-value', cachedValue, memoryCache.cacheForMinutes(1));
  }

  return <p>Cache date: {cachedValue.timestamp.toISOString()}</p>;
}
