import { Category } from 'application/models/Category';
import { Container, Token } from 'typedi';

export interface ICategoryRepository {
  /**
   * Получение списка категорий
   */
  getCategories(): Promise<Category[]>;

  /**
   * Получение категории по идентификатору
   */
  getCategoryById(id: Category['id']): Promise<Category | null>;
}

export const CATEGORY_REPOSITORY = new Token<ICategoryRepository>();

export const categoryRepository = () => Container.get(CATEGORY_REPOSITORY);
