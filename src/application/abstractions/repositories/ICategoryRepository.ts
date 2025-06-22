import { Category } from 'application/models/Category';
import { Container, Token } from 'typedi';

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;

  getCategoryById(id: Category['id']): Promise<Category | null>;
}

export const CATEGORY_REPOSITORY = new Token<ICategoryRepository>();

export const categoryRepository = () => Container.get(CATEGORY_REPOSITORY);
