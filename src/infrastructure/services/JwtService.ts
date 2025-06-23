import { IJwtService, IJwtTokenPayload, JWT_SERVICE } from 'application/abstractions/services';
import { Service } from 'typedi';
import { default as jwt } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'application/constants/auth';
import { Environment } from 'application/utils/Environment';

@Service(JWT_SERVICE)
export class JwtService implements IJwtService {
  constructor() {
    this.getTokenPayload = this.getTokenPayload.bind(this);
    this.sign = this.sign.bind(this);
  }

  /**
   * @inheritDoc
   */
  getTokenPayload(token: string): IJwtTokenPayload {
    return jwt.verify(token, Environment.JWT_SECRET) as IJwtTokenPayload;
  }

  /**
   * @inheritDoc
   */
  sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, Environment.JWT_SECRET, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
