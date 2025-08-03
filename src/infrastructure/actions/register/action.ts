'use server';

import 'reflect-metadata';
import 'server-only';
import { ActionResult, IActionResult } from 'infrastructure/utils/ActionResult';
import { RegisterResult } from 'infrastructure/actions/register/constants';
import bcrypt from 'bcrypt';
import { AUTHORIZATION_COOKIE_NAME, AUTHORIZATION_EXPIRES, PASSWORD_HASH_ROUNDS } from 'infrastructure/constants/auth';
import { cookies } from 'next/headers';
import { User } from 'infrastructure/models/User';
import { Container } from 'typedi';
import { UserRepository } from 'infrastructure/repositories';
import { JwtService } from 'infrastructure/services';

const userRepository = Container.get(UserRepository);
const jwtService = Container.get(JwtService);

export async function register(payload: FormData): Promise<IActionResult> {
  const login = (payload.get('login') as string)?.trim();
  const password = payload.get('password') as string;

  const validationResult = validatePayload(login, password);

  // Ошибка валидации
  if (validationResult.length)
    return new ActionResult(RegisterResult.ValidationFailure, validationResult);

  const exists = await userRepository.checkUserExistsByLogin(login);

  // Пользователь с таокй почтой уже существует
  if (exists)
    return new ActionResult(RegisterResult.EmailAlreadyInUse, null);

  const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);

  const user = await userRepository.createUser(login, hashedPassword);

  const jwtToken = jwtService.sign({ id: user.id, login: user.login });

  const cookie = await cookies();

  cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + AUTHORIZATION_EXPIRES,
  });

  // Успешная регистрация
  return new ActionResult(RegisterResult.Success, null);
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
