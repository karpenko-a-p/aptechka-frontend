'use client';

import 'reflect-metadata';
import { FC } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import { IS_SERVER } from 'server/constants/side';

enableStaticRendering(IS_SERVER);

export const Configurations: FC<Children> = ({ children }) => children;
