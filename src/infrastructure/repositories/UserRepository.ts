import { IUserRepository, USER_REPOSITORY } from 'application/abstractions/repositories';
import { User } from 'src/application/models/User';
import { Service } from 'typedi';
import { DatabaseProvider } from 'infrastructure/repositories/DatabaseProvider';
import { cache } from 'react';

interface IUserEntity {
  id: number;
  login: string;
  password: string;
}

@Service(USER_REPOSITORY)
export class UserRepository implements IUserRepository {
  constructor() {
    this.checkUserExistsByLogin = this.checkUserExistsByLogin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUserById = cache(this.getUserById.bind(this));
    this.deleteUserById = this.deleteUserById.bind(this);
  }

  /**
   * @inheritDoc
   */
  async checkUserExistsByLogin(login: User['login']): Promise<boolean> {
    const query = 'SELECT 1 FROM users AS u WHERE u.login = $1;';
    const { rowCount } = await DatabaseProvider.pool.query(query, [login]);
    return !!rowCount;
  }

  /**
   * @inheritDoc
   */
  async createUser(login: string, password: string): Promise<User> {
    const query = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await DatabaseProvider.pool.query<Omit<IUserEntity, 'password'>>(query, [login, password]);

    const newUser = new User();
    newUser.login = rows[0].login;
    newUser.id = rows[0].id;

    return newUser;
  }

  /**
   * @inheritDoc
   */
  async getUserById(id: User['id']): Promise<Nullable<User>> {
    const query = 'SELECT id, login FROM users AS u WHERE u.id = $1;';
    const { rows } = await DatabaseProvider.pool.query<Omit<IUserEntity, 'password'>>(query, [id]);

    if (!rows[0])
      return null;

    const user = new User();
    user.login = rows[0].login;
    user.id = rows[0].id;

    return user;
  }

  /**
   * @inheritDoc
   */
  async deleteUserById(id: User['id']): Promise<void> {
    const query = 'DELETE FROM users AS u WHERE u.id = $1;';
    await DatabaseProvider.pool.query(query, [id]);
  }

  /**
   * @inheritDoc
   */
  async getUserWithPasswordByLogin(login: User['login']): Promise<Nullable<{ user: User, password: string }>> {
    const query = 'SELECT * FROM users AS u WHERE u.login = $1;';
    const { rows } = await DatabaseProvider.pool.query<IUserEntity>(query, [login]);

    if (!rows[0])
      return null;

    const user = new User();
    user.login = rows[0].login;
    user.id = rows[0].id;

    return { user, password: rows[0].password };
  }
}
