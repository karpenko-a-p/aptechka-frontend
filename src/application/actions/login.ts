'use server';

import 'server-only';
import { IActionResult } from 'application/abstractions/utils/IActionResult';
import { cookies } from 'next/headers';
import { LoginResult } from 'application/actions/login.constants';

export async function login(payload: FormData): Promise<IActionResult> {
  const formLogin = payload.get('login') as string;
  const password = payload.get('password') as string;

  const validationResult = validatePayload(formLogin, password);

  if (validationResult.length)
    return { code: LoginResult.ValidationFailure, payload: validationResult };

  const cookie = await cookies();

  // TODO login

  return { code: LoginResult.Success, payload: null };
}

function validatePayload(login: string, password: string): string[] {
  const errors: string[] = [];

  if (!login || !password) {
    errors.push('Не передан логин или пароль');
    return errors;
  }

  if (login.length < 6 || login.length > 30)
    errors.push('Минимальная длинна логина 6 символов, максимальная 32 символов');

  if (!/^[a-zA-Z\d \-_]+$/.test(login))
    errors.push('Логин содержит недопустимые символы');

  if (password.length < 6 || password.length > 120)
    errors.push('Минимальная длинна пароля 6 символов, максимальная 120 символов');

  return errors;
}