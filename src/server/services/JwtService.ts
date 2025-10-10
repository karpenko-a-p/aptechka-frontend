import 'server-only';
import { default as jwt } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'server/constants/auth';
import { Environment } from 'server/services/Environment';
import { UserLogin, UserId } from 'server/models/User';

export interface IJwtTokenPayload {
  id: UserId;
  login: UserLogin;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export abstract class JwtService {
  static getTokenPayload(token: string): IJwtTokenPayload {
    return jwt.verify(token, Environment.JWT_SECRET) as IJwtTokenPayload;
  }

  static sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, Environment.JWT_SECRET, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
