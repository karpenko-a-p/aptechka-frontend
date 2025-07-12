'use server';

import 'reflect-metadata';
import 'infrastructure/services';
import 'infrastructure/repositories';
import 'server-only';
import { IActionResult } from 'application/abstractions/utils';
import { RegisterResult } from 'application/actions/register.constants';
import bcrypt from 'bcrypt';
import { AUTHORIZATION_COOKIE_NAME, AUTHORIZATION_EXPIRES, PASSWORD_HASH_ROUNDS } from 'application/constants/auth';
import { cookies } from 'next/headers';
import { User } from 'application/models/User';
import { Container } from 'typedi';
import { UserRepository } from 'application/repositories';
import { JwtService } from 'application/services';

const { checkUserExistsByLogin, createUser } = Container.get(UserRepository);
const { sign } = Container.get(JwtService);

export async function register(payload: FormData): Promise<IActionResult> {
  const login = (payload.get('login') as string)?.trim();
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

  const user = await createUser(login, hashedPassword);

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

  if (login.length < User.LOGIN_MIN_LENGTH || login.length > User.LOGIN_MAX_LENGTH)
    errors.push(`Минимальная длинна логина ${User.LOGIN_MIN_LENGTH} символов, максимальная ${User.LOGIN_MAX_LENGTH} символов`);

  if (!User.LOGIN_PATTERN.test(login))
    errors.push('Логин содержит недопустимые символы');

  if (password.length < User.PASSWORD_MIN_LENGTH || password.length > User.PASSWORD_MAX_LENGTH)
    errors.push(`Минимальная длинна пароля ${User.PASSWORD_MIN_LENGTH} символов, максимальная ${User.PASSWORD_MAX_LENGTH} символов`);

  return errors;
}
