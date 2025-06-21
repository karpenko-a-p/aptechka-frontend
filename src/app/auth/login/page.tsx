'use client';

import { IconLogin2, IconEye } from '@tabler/icons-react';
import { Input } from 'presentation/ui/components';
import Link from 'next/link';
import { useBoolean } from 'presentation/hooks';
import { FormEvent, useTransition } from 'react';
import { login } from 'application/actions/login';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { value: showPassword, toggle } = useBoolean();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      await login(new FormData(event.target as HTMLFormElement));
      router.push('/profile');
    });
  };

  return (
    <div className="bg-blue-500 p-2 grow flex items-center justify-center">
      <form onSubmit={handleSubmit} className="paper flex flex-col w-full max-w-[400px]">
        <h1 className="mb-4">Вход</h1>
        <Input label="Логин" name="login" disabled={isPending} className="mb-2" />

        <div className="relative mb-4">
          <Input
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            disabled={isPending}
            name="password"
            className="[&_input]:pr-8"
          />
          <IconEye
            onClick={toggle}
            data-show={showPassword}
            className="absolute top-[50%] right-2 -translate-y-[50%] cursor-pointer data-[show='true']:text-blue-500"
          />
        </div>

        <div className="flex gap-4 items-center">
          <button disabled={isPending}>
            <IconLogin2 />
            Войти
          </button>
          <Link href="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  );
}
