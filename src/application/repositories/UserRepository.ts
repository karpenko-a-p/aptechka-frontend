import { User, type UserId, type UserLogin, type UserPassword } from 'application/models/User';
import { Service } from 'typedi';
import { DatabaseProvider } from 'application/repositories/DatabaseProvider';
import { Cache, Bind } from 'application/decorators';

interface IUserEntity {
  id: number;
  login: string;
  password: string;
}

@Service()
export class UserRepository {
  /**
   * @inheritDoc
   */
  @Bind()
  async checkUserExistsByLogin(login: UserLogin): Promise<boolean> {
    const query = 'SELECT 1 FROM users AS u WHERE u.login = $1;';
    const { rowCount } = await DatabaseProvider.pool.query(query, [login]);
    return !!rowCount;
  }

  /**
   * @inheritDoc
   */
  @Bind()
  async createUser(login: UserLogin, password: UserPassword): Promise<User> {
    const query = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await DatabaseProvider.pool.query<Omit<IUserEntity, 'password'>>(query, [login, password]);
    return UserRepository.entityToModel(rows[0]);
  }

  /**
   * @inheritDoc
   */
  @Cache()
  @Bind()
  async getUserById(id: UserId): Promise<Nullable<User>> {
    const query = 'SELECT id, login FROM users AS u WHERE u.id = $1;';
    const { rows } = await DatabaseProvider.pool.query<Omit<IUserEntity, 'password'>>(query, [id]);
    return rows[0] ? UserRepository.entityToModel(rows[0]) : null;
  }

  /**
   * @inheritDoc
   */
  @Bind()
  async deleteUserById(id: UserId): Promise<void> {
    const query = 'DELETE FROM users AS u WHERE u.id = $1;';
    await DatabaseProvider.pool.query(query, [id]);
  }

  /**
   * @inheritDoc
   */
  @Bind()
  async getUserWithPasswordByLogin(login: UserLogin): Promise<Nullable<User>> {
    const query = 'SELECT * FROM users AS u WHERE u.login = $1;';
    const { rows } = await DatabaseProvider.pool.query<IUserEntity>(query, [login]);
    return rows[0] ? UserRepository.entityToModel(rows[0]) : null;
  }

  private static entityToModel(entity: Partial<IUserEntity>): User {
    return new User()
      .setId(entity.id)
      .setLogin(entity.login)
      .setPassword(entity.password);
  }
}
