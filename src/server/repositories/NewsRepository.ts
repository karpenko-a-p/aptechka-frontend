import { News, INews, type NewsId } from 'server/models/News';
import 'server-only';
import { Database, INewsEntity } from 'server/database';
import { Cache } from 'server/decorators';
import { DistCache } from 'server/cache';

export abstract class NewsRepository {
  @Cache()
  static async getNews(): Promise<INews[]> {
    const { cached, payload: cachedNews } = await DistCache.get<INews[]>(this.getNews.name);

    if (cached) return cachedNews;

    const query = 'SELECT id::integer, * FROM news LIMIT 5;';

    const { rows } = await Database.query<INewsEntity>(query);

    const news = rows.map(NewsRepository.entityToModel);

    await DistCache.setWithTags(this.getNews.name, news, ['news'], DistCache.ONE_HOUR);

    return news;
  }

  @Cache()
  static async getNewsById(id: NewsId): Promise<Nullable<INews>> {
    const tag = `getNewsById(${id})`;

    const { cached, payload: cachedNews } = await DistCache.get<Nullable<INews>>(tag);

    if (cached) return cachedNews;

    const query = 'SELECT * FROM news WHERE id = $1;';

    const { rows: [newsEntity = null] } = await Database.query<INewsEntity>(query, [id]);

    const news = newsEntity && NewsRepository.entityToModel(newsEntity);

    await DistCache.setWithTags(tag, newsEntity, ['news'], DistCache.ONE_HOUR);

    return news;
  }

  @Cache()
  static getNewUsersDiscount(): Promise<number> {
    return Promise.resolve(10);
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: INewsEntity): INews {
    return News.new(Number(entity.id), entity.title, entity.content, entity.create_date);
  }
}
