'use client';

import { createContext, type JSX, useContext } from 'react';

const PayloadContext = createContext<unknown>(null);

export const usePayload = <TPayload = unknown,>(): TPayload => {
  const payload = useContext(PayloadContext);

  if (!payload)
    throw new Error('usePayload должен вызываться внутри PayloadProvider');

  return payload as TPayload;
};

export const PayloadProvider = <TPayload = unknown,>(props: Children & { payload: TPayload }): JSX.Element => {
  return <PayloadContext.Provider value={props.payload}>{props.children}</PayloadContext.Provider>;
};
