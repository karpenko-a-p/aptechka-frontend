'use client';

import React, { FC } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import { isServer } from 'application/constants/side';

enableStaticRendering(isServer);

export const Providers: FC<Children> = ({ children }) => {
  return <>{children}</>;
};
