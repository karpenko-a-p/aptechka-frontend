'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconLogin2 } from '@tabler/icons-react';

export const UserLogin = () => {
  const router = useRouter();

  return (
    <button className="secondary" onClick={() => router.push('/auth/login')}>
      <IconLogin2 />
      Войти
    </button>
  );
};
