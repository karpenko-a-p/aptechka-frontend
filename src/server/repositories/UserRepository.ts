import { User, type UserId, type UserLogin, type UserPassword } from 'server/models/User';
import { Database, IUserEntity } from 'server/database';
import { Cache } from 'server/decorators';

export abstract class UserRepository {
  static async checkUserExistsByLogin(login: UserLogin): Promise<boolean> {
    const query = 'SELECT 1 FROM users AS u WHERE u.login = $1;';
    const { rowCount } = await Database.pool.query(query, [login]);
    return !!rowCount;
  }

  static async createUser(login: UserLogin, password: UserPassword): Promise<User> {
    const query = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await Database.pool.query<Omit<IUserEntity, 'password'>>(query, [login, password]);
    return UserRepository.entityToModel(rows[0]);
  }

  @Cache()
  static async getUserById(id: UserId): Promise<Nullable<User>> {
    const query = 'SELECT id, login FROM users AS u WHERE u.id = $1;';
    const { rows } = await Database.pool.query<Omit<IUserEntity, 'password'>>(query, [id]);
    return rows[0] ? UserRepository.entityToModel(rows[0]) : null;
  }

  static async deleteUserById(id: UserId): Promise<void> {
    const query = 'DELETE FROM users AS u WHERE u.id = $1;';
    await Database.pool.query(query, [id]);
  }

  static async getUserWithPasswordByLogin(login: UserLogin): Promise<Nullable<User>> {
    const query = 'SELECT * FROM users AS u WHERE u.login = $1;';
    const { rows } = await Database.pool.query<IUserEntity>(query, [login]);
    return rows[0] ? UserRepository.entityToModel(rows[0]) : null;
  }

  private static entityToModel(entity: Partial<IUserEntity>): User {
    return new User()
      .setId(entity.id)
      .setLogin(entity.login)
      .setPassword(entity.password);
  }
}
