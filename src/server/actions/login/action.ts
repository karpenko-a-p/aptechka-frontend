'use server';

import 'server-only';
import { ActionResult, IActionResult } from 'server/utils/ActionResult';
import { cookies } from 'next/headers';
import { LoginResult } from 'server/actions/login/constants';
import bcrypt from 'bcrypt';
import { AUTHORIZATION_COOKIE_NAME, AUTHORIZATION_EXPIRES } from 'server/constants/auth';
import { User } from 'server/models/User';
import { UserRepository } from 'server/repositories';
import { Jwt } from 'server/services/Jwt';

export async function login(payload: FormData): Promise<IActionResult> {
  const formLogin = (payload.get('login') as string)?.trim();
  const password = payload.get('password') as string;

  const validationResult = validatePayload(formLogin, password);

  // Ошибка валидации
  if (validationResult.length)
    return new ActionResult(LoginResult.ValidationFailure, validationResult);

  const user = await UserRepository.getUserWithPasswordByLogin(formLogin);

  // Пользователь не найден
  if (!user)
    return new ActionResult(LoginResult.InvalidLoginOrPassword, null);

  const passwordVerified = await bcrypt.compare(password, user.password);

  // Пароли не совпали
  if (!passwordVerified)
    return new ActionResult(LoginResult.InvalidLoginOrPassword, null);

  const jwtToken = Jwt.sign({ id: user.id, login: user.login });

  const cookie = await cookies();

  cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + AUTHORIZATION_EXPIRES,
  });

  // Успешная авторизация
  return new ActionResult(LoginResult.Success, null);
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