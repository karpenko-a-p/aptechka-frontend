import 'server-only';
import {
  AUTHORIZATION_COOKIE_NAME,
  AUTHORIZATION_EXPIRES,
  AUTHORIZATION_REVALIDATION_TIME
} from 'application/constants/auth';
import { cookies } from 'next/headers';
import { Container } from 'typedi';
import { JwtService, IJwtTokenPayload } from 'application/services';

const { getTokenPayload, sign } = Container.get(JwtService);

/**
 * Получение информации по пользователю из токена
 */
export async function parseJwtToken(): Promise<Nullable<IJwtTokenPayload>> {
  const cookie = await cookies();
  const jwtToken = cookie.get(AUTHORIZATION_COOKIE_NAME)?.value;

  if (!jwtToken)
    return null;

  const tokenPayload = getTokenPayload(jwtToken);

  if(!tokenPayload)
    return null;

  // Обноление токена если ему осталось жить меньше 2-х дней
  if (tokenPayload.exp <= Date.now() + AUTHORIZATION_REVALIDATION_TIME) {
    const jwtToken = sign({ id: tokenPayload.id, login: tokenPayload.login });

    cookie.set(AUTHORIZATION_COOKIE_NAME, jwtToken, {
      httpOnly: true,
      secure: true,
      expires: Date.now() + AUTHORIZATION_EXPIRES,
    });
  }

  return tokenPayload;
}