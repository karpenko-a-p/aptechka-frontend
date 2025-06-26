import { IJwtService, type IJwtTokenPayload, JWT_SERVICE } from 'application/abstractions/services';
import { Service } from 'typedi';
import { default as jwt } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'application/constants/auth';
import { Environment } from 'application/utils/Environment';
import { Bind } from 'application/decorators';

@Service(JWT_SERVICE)
export class JwtService implements IJwtService {
  /**
   * @inheritDoc
   */
  @Bind()
  getTokenPayload(token: string): IJwtTokenPayload {
    return jwt.verify(token, Environment.JWT_SECRET) as IJwtTokenPayload;
  }

  /**
   * @inheritDoc
   */
  @Bind()
  sign(payload: Pick<IJwtTokenPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, Environment.JWT_SECRET, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
