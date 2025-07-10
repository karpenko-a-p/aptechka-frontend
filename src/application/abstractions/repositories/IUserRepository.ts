import { User, UserId, UserLogin, UserPassword } from 'application/models/User';
import { Container, Token } from 'typedi';

export interface IUserRepository {
  checkUserExistsByLogin(login: UserLogin): Promise<boolean>;

  createUser(login: UserLogin, password: UserPassword): Promise<User>;

  getUserById(id: UserId): Promise<Nullable<User>>;

  deleteUserById(id: UserId): Promise<void>;

  getUserWithPasswordByLogin(login: UserLogin): Promise<Nullable<User>>;
}

export const USER_REPOSITORY = new Token<IUserRepository>();

export const userRepository = (): IUserRepository => Container.get(USER_REPOSITORY);
