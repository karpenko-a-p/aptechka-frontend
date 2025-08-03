import { Service } from 'typedi';
import { default as jwt } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'infrastructure/constants/auth';
import { Environment } from 'infrastructure/utils/Environment';
import { Bind } from 'infrastructure/decorators';
import { UserLogin, UserId } from 'infrastructure/models/User';

export interface IJwtTokenPayload {
  id: UserId;
  login: UserLogin;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

@Service()
export class JwtService {
  @Bind()
  getTokenPayload(token: string): IJwtTokenPayload {
    return jwt.verify(token, Environment.JWT_SECRET) as IJwtTokenPayload;
  }

  @Bind()
  sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, Environment.JWT_SECRET, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
