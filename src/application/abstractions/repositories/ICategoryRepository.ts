import { Category } from 'application/models/Category';
import { Token } from 'typedi';
import { getService } from 'application/utils';

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;

  getCategoryById(id: Category['id']): Promise<Category | null>;
}

export const CATEGORY_REPOSITORY = new Token<ICategoryRepository>();

export const categoryRepository = () => getService(CATEGORY_REPOSITORY);
