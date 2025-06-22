import { Container, Token } from 'typedi';
import { User } from 'application/models/User';

export interface IAuthRepository {
  checkAccess(): Promise<boolean>;
  getUser(): Promise<User | null>;
}

export const AUTH_REPOSITORY = new Token<IAuthRepository>();

export const authRepository = () => Container.get(AUTH_REPOSITORY);
