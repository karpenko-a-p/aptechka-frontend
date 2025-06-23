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
  sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string;

  getTokenPayload(token: Nullable<string>): Nullable<IJwtTokenPayload>;
}

export const JWT_SERVICE = new Token<IJwtService>();

export const jwtService = () => Container.get(JWT_SERVICE);
