import { AUTH_REPOSITORY, IAuthRepository } from 'application/abstractions/repositories';
import { Service } from 'typedi';
import { cache } from 'react';
import { User } from 'src/application/models/User';
import 'server-only';

@Service(AUTH_REPOSITORY)
export class AuthRepository implements IAuthRepository {
  constructor() {
    this.checkAccess = cache(this.checkAccess.bind(this));
    this.getUser = cache(this.getUser.bind(this));
  }

  async getUser(): Promise<User | null> {
    const user = new User();
    user.name = 'Alexander';
    user.id = 123;

    return user;
  }

  checkAccess(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
