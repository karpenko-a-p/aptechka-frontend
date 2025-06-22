'use server';

import 'reflect-metadata';
import 'infrastructure/services';
import 'infrastructure/repositories';
import 'server-only';
import { IActionResult } from 'application/abstractions/utils';
import { RegisterResult } from 'application/actions/register.constants';
import { userRepository } from 'application/abstractions/repositories';
import bcrypt from 'bcrypt';
import { AUTHORIZATION_COOKIE_NAME, AUTHORIZATION_EXPIRES, PASSWORD_HASH_ROUNDS } from 'application/constants/auth';
import { cookies } from 'next/headers';
import { jwtService } from 'application/abstractions/services';

const { checkUserExistsByLogin, createUser } = userRepository();
const { sign } = jwtService();

export async function register(payload: FormData): Promise<IActionResult> {
  const login = payload.get('login') as string;
  const password = payload.get('password') as string;

  const validationResult = validatePayload(login, password);

  // Ошибка валидации
  if (validationResult.length)
    return { code: RegisterResult.ValidationFailure, payload: validationResult };

  const exists = await checkUserExistsByLogin(login);

  // Пользователь с таокй почтой уже существует
  if (exists)
    return { code: RegisterResult.EmailAlreadyInUse, payload: null };

  const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);

  const user = await createUser(login.trim(), hashedPassword);

  const jwtToken = sign({ id: user.id, login: user.login });

  const cookie = await cookies();

  cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + AUTHORIZATION_EXPIRES,
  });

  // Успешная регистрация
  return { code: RegisterResult.Success, payload: null };
}

function validatePayload(login: string, password: string): string[] {
  const errors: string[] = [];

  if (!login || !password) {
    errors.push('Не передан логин или пароль');
    return errors;
  }

  if (login.length < 6 || login.length > 32)
    errors.push('Минимальная длинна логина 6 символов, максимальная 32 символов');

  if (!/^[a-zA-Z\d \-_]+$/.test(login))
    errors.push('Логин содержит недопустимые символы');

  if (password.length < 6 || password.length > 120)
    errors.push('Минимальная длинна пароля 6 символов, максимальная 120 символов');

  return errors;
}
