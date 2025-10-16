import 'server-only';
import { default as jwt, JwtPayload } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'server/constants/auth';
import { Environment } from 'server/services/Environment';
import { UserLogin, UserId } from 'server/models/User';

export interface IJwtPayload extends JwtPayload {
  id: UserId;
  login: UserLogin;
}

export abstract class Jwt {
  static getTokenPayload(token: string): Nullable<IJwtPayload> {
    try {
      return jwt.verify(token, Environment.JWT_SECRET) as IJwtPayload;
    } catch {
      return null;
    }
  }

  static sign(payload: Pick<IJwtPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, Environment.JWT_SECRET, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
