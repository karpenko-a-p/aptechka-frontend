import { Category, type CategoryId, ICategory } from 'server/models/Category';
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
  static async getCategories(): Promise<ICategory[]> {
    const { cached, payload: cachedCategories } = await DistCache.get<ICategory[]>(this.getCategories.name);

    if (cached) return cachedCategories;

    const { rows } = await CategoryRepository.selectAllCategoriesQuery();

    const categories = rows.map(CategoryRepository.entityToModel);

    await DistCache.setWithTags(this.getCategories.name, categories, ['categories'], DistCache.ONE_HOUR);

    return categories;
  }

  @Cache()
  static async getCategoryById(id: CategoryId): Promise<Nullable<ICategory>> {
    const tag = `getCategoryById(${id})`;

    const { cached, payload: cachedCategory } = await DistCache.get<Nullable<ICategory>>(tag);

    if (cached) return cachedCategory;

    const query = `
      SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') AS key_words
      FROM categories AS c
      JOIN categories_key_words AS ckw ON ckw.category_id = c.id
      WHERE id = $1
      GROUP BY c.id;
    `;

    const { rows: [categoryEntity = null] } = await Database.query<ICategoryWithKeyWordsEntity>(query, [id]);

    const category = categoryEntity && CategoryRepository.entityToModel(categoryEntity);

    await DistCache.setWithTags(tag, category, ['categories'], DistCache.ONE_HOUR);

    return category;
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: ICategoryWithKeyWordsEntity): ICategory {
    return Category.new(entity.id, entity.name, entity.description, entity.banner, entity.key_words.split(','));
  }
}
