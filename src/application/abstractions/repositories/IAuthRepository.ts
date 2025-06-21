import { Token } from 'typedi';
import { getService } from 'application/utils';
import { User } from 'application/models/User';

export interface IAuthRepository {
  checkAccess(): Promise<boolean>;
  getUser(): Promise<User | null>;
}

export const AUTH_REPOSITORY = new Token<IAuthRepository>();

export const authRepository = () => getService(AUTH_REPOSITORY);
