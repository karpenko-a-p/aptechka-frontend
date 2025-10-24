import { User, IUser, type UserId, type UserLogin, type UserPassword } from 'server/models/User';
import { Database, IUserEntity } from 'server/database';
import { Cache } from 'server/decorators';
import { DistCache } from 'server/cache';

export abstract class UserRepository {
  static async checkUserExistsByLogin(login: UserLogin): Promise<boolean> {
    const query = 'SELECT 1 FROM users AS u WHERE u.login = $1;';
    const { rowCount } = await Database.query(query, [login]);
    return !!rowCount;
  }

  static async createUser(login: UserLogin, password: UserPassword): Promise<IUser> {
    const query = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await Database.query<Omit<IUserEntity, 'password'>>(query, [login, password]);
    return UserRepository.entityToModel(rows[0]);
  }

  @Cache()
  static async getUserById(id: UserId): Promise<Nullable<IUser>> {
    const tag = `getUserById(${id})`;

    const { cached, payload: cachedUser } = await DistCache.get<Nullable<IUser>>(tag);

    if (cached) return cachedUser;

    const query = 'SELECT id, login FROM users AS u WHERE u.id = $1;';

    const { rows: [userEntity = null] } = await Database.query<Omit<IUserEntity, 'password'>>(query, [id]);

    const user = userEntity && UserRepository.entityToModel(userEntity);

    await DistCache.set(tag, user, DistCache.ONE_DAY);

    return user;
  }

  static async deleteUserById(id: UserId): Promise<void> {
    const query = 'DELETE FROM users AS u WHERE u.id = $1;';
    await Database.query(query, [id]);
  }

  static async getUserWithPasswordByLogin(login: UserLogin): Promise<Nullable<IUser>> {
    const query = 'SELECT * FROM users AS u WHERE u.login = $1;';
    const { rows: [userEntity] } = await Database.query<IUserEntity>(query, [login]);
    return userEntity && UserRepository.entityToModel(userEntity);
  }

  private static entityToModel(entity: Partial<IUserEntity>): IUser {
    return User.new(entity.id, entity.login, entity.password);
  }
}
