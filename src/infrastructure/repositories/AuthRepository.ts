import { AUTH_REPOSITORY, IAuthRepository } from 'application/abstractions/repositories';
import { Service } from 'typedi';
import { onServer } from 'application/utils/onServer';
import { cache } from 'react';

@Service(AUTH_REPOSITORY)
export class AuthRepository implements IAuthRepository {
  constructor() {
    onServer(() => {
      this.checkAccess = cache(this.checkAccess.bind(this));
    });
  }

  checkAccess(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
