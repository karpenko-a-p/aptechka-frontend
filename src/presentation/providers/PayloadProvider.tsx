'use client';

import { createContext, useContext } from 'react';

const PayloadContext = createContext<unknown>(null);

export const usePayload = <TPayload = unknown,>(): TPayload => {
  const payload = useContext(PayloadContext);

  if (!payload)
    throw new Error('usePayload должен вызываться внутри PayloadProvider');

  return payload as TPayload;
};

export const PayloadProvider = <TPayload = unknown,>({ children, payload }: Children & { payload: TPayload }) => {
  return <PayloadContext.Provider value={payload}>{children}</PayloadContext.Provider>;
};
