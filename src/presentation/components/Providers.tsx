'use client';

import 'reflect-metadata';
import React, { FC } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import { IS_SERVER } from 'infrastructure/constants/side';

enableStaticRendering(IS_SERVER);

export const Providers: FC<Children> = ({ children }) => {
  return <>{children}</>;
};
