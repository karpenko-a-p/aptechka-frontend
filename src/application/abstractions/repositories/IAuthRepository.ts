import { Token } from 'typedi';
import { getService } from 'application/utils';

export interface IAuthRepository {
  checkAccess(): Promise<boolean>;
}

export const AUTH_REPOSITORY = new Token<IAuthRepository>();

export const authRepository = () => getService(AUTH_REPOSITORY);
