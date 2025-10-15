import { News, type NewsId } from 'server/models/News';
import 'server-only';
import { Database, INewsEntity } from 'server/database';
import { Cache } from 'server/decorators';
import { DistCache } from 'server/cache';

export abstract class NewsRepository {
  @Cache()
  static async getNews(): Promise<News[]> {
    const cachedRows = await DistCache.get<INewsEntity[]>('getNews');

    if (cachedRows) {
      return cachedRows.map(NewsRepository.entityToModel);
    }

    const query = 'SELECT id::integer, * FROM news LIMIT 5;';

    const { rows } = await Database.pool.query<INewsEntity>(query);

    await DistCache.setWithTags('getNews', rows, ['news'], DistCache.ONE_HOUR);

    return rows.map(NewsRepository.entityToModel);
  }

  @Cache()
  static async getNewsById(id: NewsId): Promise<Nullable<News>> {
    const cachedRow = await DistCache.get<INewsEntity>(`getNewsById(${id})`);

    if (cachedRow) {
      return NewsRepository.entityToModel(cachedRow);
    }

    const query = 'SELECT * FROM news WHERE id = $1;';

    const { rows: [newsEntity] } = await Database.pool.query<INewsEntity>(query, [id]);

    await DistCache.setWithTags(`getNewsById(${id})`, newsEntity, ['news'], DistCache.ONE_HOUR);

    return newsEntity && NewsRepository.entityToModel(newsEntity);
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
