import { Category, type CategoryId } from 'infrastructure/models/Category';
import { Service } from 'typedi';
import 'server-only';
import { Cache } from 'infrastructure/decorators';
import { DatabaseProvider } from 'infrastructure/repositories/DatabaseProvider';

interface ICategoryEntity {
  id: string;
  name: string;
  description: string;
  banner: string;
}

interface ICategoryWithKeyWordsEntity extends ICategoryEntity {
  key_words: string;
}

@Service()
export class CategoryRepository {
  /**
   * Получение списка всех категорий
   */
  private static selectAllCategoriesQuery = DatabaseProvider.compileQuery<ICategoryWithKeyWordsEntity>(`
    SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') AS key_words
    FROM categories AS c
    JOIN categories_key_words AS ckw ON ckw.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id;
  `);

  @Cache()
  async getCategories(): Promise<Category[]> {
    const { rows } = await CategoryRepository.selectAllCategoriesQuery();
    return rows.map(CategoryRepository.entityToModel);
  }

  @Cache()
  async getCategoryById(id: CategoryId): Promise<Nullable<Category>> {
    const query = `
      SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') AS key_words
      FROM categories AS c
      JOIN categories_key_words AS ckw ON ckw.category_id = c.id
      WHERE id = $1
      GROUP BY c.id;
    `;

    const { rows } = await DatabaseProvider.pool.query<ICategoryWithKeyWordsEntity>(query, [id]);
    return rows[0] ? CategoryRepository.entityToModel(rows[0]) : null;
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
