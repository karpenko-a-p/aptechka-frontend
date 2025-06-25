import { CATEGORY_REPOSITORY, ICategoryRepository } from 'application/abstractions/repositories';
import { Category } from 'application/models/Category';
import { Service } from 'typedi';
import 'server-only';
import { Bind, Cache } from 'application/decorators';
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

@Service(CATEGORY_REPOSITORY)
export class CategoryRepository implements ICategoryRepository {
  /**
   * @inheritDoc
   */
  @Cache()
  @Bind()
  async getCategories(): Promise<Category[]> {
    const query = `
      SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') as key_words
      FROM categories AS c
      JOIN categories_key_words AS ckw ON ckw.category_id = c.id
      GROUP BY c.id;
    `;
    const { rows } = await DatabaseProvider.pool.query<ICategoryWithKeyWordsEntity>(query);
    return rows.map(CategoryRepository.entityToModel);
  }

  /**
   * @inheritDoc
   */
  @Cache()
  @Bind()
  async getCategoryById(id: Category['id']): Promise<Nullable<Category>> {
    const query = `
      SELECT c.id, c.description, c.banner, c.name, string_agg(ckw.key_word, ',') as key_words
      FROM categories AS c
      JOIN categories_key_words AS ckw ON ckw.category_id = c.id
      WHERE id = $1
      GROUP BY c.id;
    `;

    const { rows } = await DatabaseProvider.pool.query<ICategoryWithKeyWordsEntity>(query, [id]);

    if (!rows[0])
      return null;

    return CategoryRepository.entityToModel(rows[0]);
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: ICategoryWithKeyWordsEntity): Category {
    const category = new Category();
    category.id = entity.id;
    category.name = entity.name;
    category.description = entity.description;
    category.banner = entity.banner;
    category.keysWords = entity.key_words.split(',');
    return category;
  }
}
