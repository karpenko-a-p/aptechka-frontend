'use server';

import 'reflect-metadata';
import 'infrastructure/services';
import 'infrastructure/repositories';
import 'server-only';
import { IActionResult } from 'application/abstractions/utils/IActionResult';
import { cookies } from 'next/headers';
import { LoginResult } from 'application/actions/login.constants';
import { userRepository } from 'application/abstractions/repositories';
import bcrypt from 'bcrypt';
import { AUTHORIZATION_COOKIE_NAME, AUTHORIZATION_EXPIRES } from 'application/constants/auth';
import { jwtService } from 'application/abstractions/services';
import { User } from 'application/models/User';

const { getUserWithPasswordByLogin } = userRepository();
const { sign } = jwtService();

export async function login(payload: FormData): Promise<IActionResult> {
  const formLogin = payload.get('login') as string;
  const password = payload.get('password') as string;

  const validationResult = validatePayload(formLogin, password);

  // Ошибка валидации
  if (validationResult.length)
    return { code: LoginResult.ValidationFailure, payload: validationResult };

  const user = await getUserWithPasswordByLogin(formLogin);

  // Пользователь не найден
  if (!user)
    return { code: LoginResult.InvalidLoginOrPassword, payload: null };

  const passwordVerified = await bcrypt.compare(password, user.password);

  // Пароли не совпали
  if (!passwordVerified)
    return { code: LoginResult.InvalidLoginOrPassword, payload: null };

  const jwtToken = sign({ id: user.id, login: user.login });

  const cookie = await cookies();

  cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + AUTHORIZATION_EXPIRES,
  });

  // Успешная авторизация
  return { code: LoginResult.Success, payload: null };
}

function validatePayload(login: string, password: string): string[] {
  const errors: string[] = [];

  if (!login || !password) {
    errors.push('Не передан логин или пароль');
    return errors;
  }

  if (login.length < User.LOGIN_MIN_LENGTH || login.length > User.LOGIN_MAX_LENGTH)
    errors.push(`Минимальная длинна логина ${User.LOGIN_MIN_LENGTH} символов, максимальная ${User.LOGIN_MAX_LENGTH} символов`);

  if (!User.LOGIN_PATTERN.test(login))
    errors.push('Логин содержит недопустимые символы');

  if (password.length < User.PASSWORD_MIN_LENGTH || password.length > User.PASSWORD_MAX_LENGTH)
    errors.push(`Минимальная длинна пароля ${User.PASSWORD_MIN_LENGTH} символов, максимальная ${User.PASSWORD_MAX_LENGTH} символов`);

  return errors;
}