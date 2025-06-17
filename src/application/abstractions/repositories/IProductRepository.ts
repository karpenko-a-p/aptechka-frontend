import { Product } from 'application/models/Product';
import { Category } from 'application/models/Category';
import { Token } from 'typedi';
import { getService } from 'application/utils';

export interface IProductRepository {
  getProductById(id: Product['id']): Product | null;

  getProductsByCategoryId(id: Category['id']): Product[];
}

export const PRODUCT_REPOSITORY = new Token<IProductRepository>();

export const productRepository = () => getService(PRODUCT_REPOSITORY);
