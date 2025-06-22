import { IJwtService, IJwtTokenPayload, JWT_SERVICE } from 'application/abstractions/services';
import { Service } from 'typedi';
import { default as jwt } from 'jsonwebtoken';
import { AUTHORIZATION_EXPIRES } from 'application/constants/auth';

@Service(JWT_SERVICE)
export class JwtService implements IJwtService {
  /**
   * Секретный ключ
   */
  private readonly jwtSecret: string;

  constructor() {
    this.getTokenPayload = this.getTokenPayload.bind(this);
    this.sign = this.sign.bind(this);

    this.jwtSecret = process.env.JWT_SECRET as string;

    if (!this.jwtSecret)
      throw new Error('JWT_SECRET is required');
  }

  /**
   * @inheritDoc
   */
  getTokenPayload(token: Nullable<string>): Nullable<IJwtTokenPayload> {
    if (!token) return null;
    return jwt.verify(token, this.jwtSecret) as Nullable<IJwtTokenPayload>;
  }

  /**
   * @inheritDoc
   */
  sign(payload: IJwtTokenPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: Date.now() + AUTHORIZATION_EXPIRES,
      issuer: 'Aptechka',
      audience: 'http://aptechka.com',
    });
  }
}
