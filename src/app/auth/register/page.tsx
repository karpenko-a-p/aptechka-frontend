'use client';

import { Input } from 'presentation/ui/components';
import { IconEye, IconLogin2 } from '@tabler/icons-react';
import Link from 'next/link';
import { type JSX } from 'react';
import { useBoolean } from 'presentation/hooks';
import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { register, isRegisterEmailAlreadyInUse, isRegisterSuccess, isRegisterValidationError } from 'infrastructure/actions/register';

export default function Page(): JSX.Element {
  const { value: showPassword, toggle } = useBoolean();
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    startTransition(async () => {
      const registerResult = await register(new FormData(event.target as HTMLFormElement));

      if (isRegisterValidationError(registerResult))
        return setErrors(registerResult.payload);

      if (isRegisterSuccess(registerResult))
        return router.push('/profile');

      if (isRegisterEmailAlreadyInUse(registerResult))
        return setErrors(['Почта уже используется']);

      setErrors(['Произошла непредвиденная ошибка, попробуйте зарегистрироваться позже']);
    });
  };

  return (
    <div className="bg-blue-500 p-2 grow flex items-center justify-center">
      <form onSubmit={handleSubmit} className="paper flex flex-col w-full max-w-[400px]">
        <h1 className="mb-4">Регистрация</h1>
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
            Зарегистрироваться
          </button>
          <Link href="/auth/register">Войти</Link>
        </div>
      </form>
    </div>
  );
}
