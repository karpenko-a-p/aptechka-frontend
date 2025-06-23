'use client';

import { IconLogin2, IconEye } from '@tabler/icons-react';
import { Input } from 'presentation/ui/components';
import Link from 'next/link';
import { useBoolean } from 'presentation/hooks';
import { FormEvent, useState, useTransition } from 'react';
import { login } from 'application/actions/login';
import { useRouter } from 'next/navigation';
import { isInvalidLoginOrPassword, isLoginSuccess, isLoginValidationError } from 'application/actions/login.constants';

export default function Page() {
  const { value: showPassword, toggle } = useBoolean();
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const loginResult = await login(new FormData(event.target as HTMLFormElement));

      if (isLoginValidationError(loginResult))
        return setErrors(loginResult.payload);

      if (isInvalidLoginOrPassword(loginResult))
        return setErrors(['Неправильный логин или пароль']);

      if (isLoginSuccess(loginResult))
        return router.push('/profile');

      setErrors(['Произошла непредвиденная ошибка, попробуйте авторизоваться позже']);
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

        {!!errors.length && (
          <ul className="mb-4 flex flex-col gap-2">
            {errors.map((error) => (
              <li key={error}>
                <p className="before:content-['•'] before:mr-0.5 text-sm text-red-500">{error}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-4 items-center">
          <button disabled={isPending}>
            <IconLogin2 />
            Войти
          </button>
          <Link href="/auth/register">Регистрация</Link>
        </div>
      </form>
    </div>
  );
}
