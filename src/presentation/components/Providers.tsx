'use client';

import React, { FC } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import { IS_SERVER } from 'application/constants/side';

enableStaticRendering(IS_SERVER);

export const Providers: FC<Children> = ({ children }) => {
  return <>{children}</>;
};
