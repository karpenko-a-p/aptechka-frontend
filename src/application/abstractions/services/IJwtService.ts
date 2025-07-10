import { Container, Token } from 'typedi';
import { User } from 'application/models/User';

export interface IJwtTokenPayload {
  id: User['id'];
  login: User['login'];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export interface IJwtService {
  /**
   * Генерация токена
   */
  sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string;

  /**
   * Чтение данных из токена
   */
  getTokenPayload(token: string): IJwtTokenPayload;
}

export const JWT_SERVICE = new Token<IJwtService>();

export const jwtService = (): IJwtService => Container.get(JWT_SERVICE);
