import React, { JSX } from 'react';
import { DistributedCache } from 'server/cache/DistributedCache';
import { Logger } from 'server/services/Logger';

interface CacheSample {
  timestamp: string;
}

export default async function Page(): Promise<JSX.Element> {
  let cachedValue = await DistributedCache.get<CacheSample>('sample-value');

  if (!cachedValue) {
    cachedValue = { timestamp: new Date().toISOString() };
    await DistributedCache.set('sample-value', cachedValue, DistributedCache.ONE_MINUTE);
  }

  Logger.info(cachedValue);
  return <p>Cache date: {cachedValue.timestamp}</p>;
}
