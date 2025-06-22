import { User } from 'application/models/User';
import { Container, Token } from 'typedi';

export interface IUserRepository {
  checkUserExistsByLogin(login: User['login']): Promise<boolean>;

  createUser(login: string, password: string): Promise<User>;

  getUserById(id: User['id']): Promise<Nullable<User>>;

  deleteUserById(id: User['id']): Promise<void>;

  getUserWithPasswordByLogin(login: User['login']): Promise<Nullable<{ user: User, password: string }>>;
}

export const USER_REPOSITORY = new Token<IUserRepository>();

export const userRepository = () => Container.get(USER_REPOSITORY);
