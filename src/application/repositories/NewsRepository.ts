import { Service } from 'typedi';
import { News, type NewsId } from 'application/models/News';
import 'server-only';
import { DatabaseProvider } from 'application/repositories/DatabaseProvider';
import { Bind, Cache } from 'application/decorators';

interface INewsEntity {
  id: string;
  title: string;
  content: string;
  create_date: Date;
}

@Service()
export class NewsRepository {
  /**
   * @inheritDoc
   */
  @Cache()
  @Bind()
  async getNews(): Promise<News[]> {
    const query = 'SELECT id::integer, * FROM news LIMIT 5;';
    const { rows } = await DatabaseProvider.pool.query<INewsEntity>(query);
    return rows.map(NewsRepository.entityToModel);
  }

  /**
   * @inheritDoc
   */
  @Cache()
  @Bind()
  async getNewsById(id: NewsId): Promise<Nullable<News>> {
    const query = 'SELECT * FROM news WHERE id = $1;';
    const { rows } = await DatabaseProvider.pool.query<INewsEntity>(query, [id]);

    if (!rows[0])
      return null;

    return NewsRepository.entityToModel(rows[0]);
  }

  /**
   * @inheritDoc
   */
  @Bind()
  getNewUsersDiscount(): Promise<number> {
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
