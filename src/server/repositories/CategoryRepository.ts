import { Category, type CategoryId } from 'server/models/Category';
import 'server-only';
import { Cache } from 'server/decorators';
import { Database, ICategoryEntity } from 'server/database';
import { DistCache } from 'server/cache/DistributedCache';

interface ICategoryWithKeyWordsEntity extends ICategoryEntity {
  key_words: string;
}

export abstract class CategoryRepository {
  /**
   * Получение списка всех категорий
   */
  private static selectAllCategoriesQuery = Database.compileQuery<ICategoryWithKeyWordsEntity>(`
    SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') AS key_words
    FROM categories AS c
    JOIN categories_key_words AS ckw ON ckw.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id;
  `);

  @Cache()
  static async getCategories(): Promise<Category[]> {
    const cachedRows = await DistCache.get<ICategoryWithKeyWordsEntity[]>('getCategories');

    if (cachedRows) {
      return cachedRows.map(CategoryRepository.entityToModel);
    }

    const { rows } = await CategoryRepository.selectAllCategoriesQuery();

    await DistCache.setWithTags('getCategories', rows, ['categories'], DistCache.ONE_HOUR);

    return rows.map(CategoryRepository.entityToModel);
  }

  @Cache()
  static async getCategoryById(id: CategoryId): Promise<Nullable<Category>> {
    const cachedRow = await DistCache.get<ICategoryWithKeyWordsEntity>(`getCategoryById:${id}`);

    if (cachedRow) {
      return CategoryRepository.entityToModel(cachedRow);
    }

    const query = `
      SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') AS key_words
      FROM categories AS c
      JOIN categories_key_words AS ckw ON ckw.category_id = c.id
      WHERE id = $1
      GROUP BY c.id;
    `;

    const { rows } = await Database.pool.query<ICategoryWithKeyWordsEntity>(query, [id]);

    if (!rows[0]) return null;

    await DistCache.setWithTags(`getCategoryById:${id}`, rows[0], ['categories'], DistCache.ONE_HOUR);

    return CategoryRepository.entityToModel(rows[0]);
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: ICategoryWithKeyWordsEntity): Category {
    return new Category()
      .setId(entity.id)
      .setName(entity.name)
      .setDescription(entity.description)
      .setBanner(entity.banner)
      .setKeywords(entity.key_words.split(','));
  }
}
