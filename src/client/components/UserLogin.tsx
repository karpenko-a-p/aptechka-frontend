'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { IconLogin2 } from '@tabler/icons-react';

export const UserLogin: FC = () => {
  const router = useRouter();

  return (
    <button className="secondary" onClick={() => router.push('/auth/login')}>
      <IconLogin2 />
      Войти
    </button>
  );
};
