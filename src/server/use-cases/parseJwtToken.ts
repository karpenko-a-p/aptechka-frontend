import 'server-only';
import {
  AUTHORIZATION_COOKIE_NAME,
  AUTHORIZATION_EXPIRES,
  AUTHORIZATION_REVALIDATION_TIME
} from 'server/constants/auth';
import { cookies } from 'next/headers';
import { Jwt, IJwtPayload } from 'server/services/Jwt';
import { cache } from 'react';

/**
 * Получение информации по пользователю из токена
 */
export const parseJwtToken = cache(async (): Promise<Nullable<IJwtPayload>> => {
  const cookie = await cookies();
  const jwtToken = cookie.get(AUTHORIZATION_COOKIE_NAME)?.value;

  if (!jwtToken)
    return null;

  const tokenPayload = Jwt.getTokenPayload(jwtToken);

  if(!tokenPayload)
    return null;

  // Обноление токена если ему осталось жить меньше 2-х дней
  if (tokenPayload.exp! <= Date.now() + AUTHORIZATION_REVALIDATION_TIME) {
    const jwtToken = Jwt.sign({ id: tokenPayload.id, login: tokenPayload.login });

    cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
      httpOnly: true,
      secure: true,
      expires: Date.now() + AUTHORIZATION_EXPIRES,
    });
  }

  return tokenPayload;
});
