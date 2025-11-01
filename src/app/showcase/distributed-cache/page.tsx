import React, { JSX } from 'react';
import { DistributedCache } from 'server/cache/DistributedCache';
import { Logger } from 'server/services/Logger';

interface CacheSample {
  timestamp: string;
}

export default async function Page(): Promise<JSX.Element> {
  // eslint-disable-next-line prefer-const
  let { cached, payload: cachedValue } = await DistributedCache.get<CacheSample>('sample-value');

  if (!cached) {
    cachedValue = { timestamp: new Date().toISOString() };
    await DistributedCache.set('sample-value', cachedValue, DistributedCache.ONE_MINUTE);
  }

  Logger.info(cachedValue);
  return <p>Cache date: {cachedValue.timestamp}</p>;
}
