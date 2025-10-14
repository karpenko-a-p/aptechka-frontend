import { News, type NewsId } from 'server/models/News';
import 'server-only';
import { Database, INewsEntity } from 'server/database';
import { Cache } from 'server/decorators';

export abstract class NewsRepository {
  @Cache()
  static async getNews(): Promise<News[]> {
    const query = 'SELECT id::integer, * FROM news LIMIT 5;';
    const { rows } = await Database.pool.query<INewsEntity>(query);
    return rows.map(NewsRepository.entityToModel);
  }

  @Cache()
  static async getNewsById(id: NewsId): Promise<Nullable<News>> {
    const query = 'SELECT * FROM news WHERE id = $1;';
    const { rows } = await Database.pool.query<INewsEntity>(query, [id]);

    if (!rows[0])
      return null;

    return NewsRepository.entityToModel(rows[0]);
  }

  @Cache()
  static getNewUsersDiscount(): Promise<number> {
    return Promise.resolve(10);
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: INewsEntity): News {
    return new News()
      .setId(Number(entity.id))
      .setName(entity.title)
      .setContent(entity.content)
      .setDate(entity.create_date);
  }
}
