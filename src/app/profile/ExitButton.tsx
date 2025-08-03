'use client';

import React, { FC, HTMLAttributes } from 'react';
import { logout } from 'infrastructure/actions/logout';
import { IconLogout2 } from '@tabler/icons-react';

export const ExitButton: FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} onClick={logout}>
      <IconLogout2 />
      Выйти из аккаунта
    </button>
  );
};
