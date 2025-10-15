import { User, type UserId, type UserLogin, type UserPassword } from 'server/models/User';
import { Database, IUserEntity } from 'server/database';
import { Cache } from 'server/decorators';
import { DistCache } from 'server/cache';

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
    const cachedRow = await DistCache.get<IUserEntity>(`getUserById(${id})`);

    if (cachedRow) {
      return UserRepository.entityToModel(cachedRow);
    }

    const query = 'SELECT id, login FROM users AS u WHERE u.id = $1;';

    const { rows: [userEntity] } = await Database.pool.query<Omit<IUserEntity, 'password'>>(query, [id]);

    await DistCache.set(`getUserById(${id})`, userEntity, DistCache.ONE_DAY);

    return userEntity && UserRepository.entityToModel(userEntity);
  }

  static async deleteUserById(id: UserId): Promise<void> {
    const query = 'DELETE FROM users AS u WHERE u.id = $1;';
    await Database.pool.query(query, [id]);
  }

  static async getUserWithPasswordByLogin(login: UserLogin): Promise<Nullable<User>> {
    const query = 'SELECT * FROM users AS u WHERE u.login = $1;';
    const { rows: [userEntity] } = await Database.pool.query<IUserEntity>(query, [login]);
    return userEntity && UserRepository.entityToModel(userEntity);
  }

  private static entityToModel(entity: Partial<IUserEntity>): User {
    return new User()
      .setId(entity.id)
      .setLogin(entity.login)
      .setPassword(entity.password);
  }
}
