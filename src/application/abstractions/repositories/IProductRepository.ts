import { Product } from 'application/models/Product';
import { Category } from 'application/models/Category';
import { Container, Token } from 'typedi';

export interface IProductRepository {
  getProductById(id: Product['id']): Product | null;

  getProductsByCategoryId(id: Category['id']): Product[];
}

export const PRODUCT_REPOSITORY = new Token<IProductRepository>();

export const productRepository = () => Container.get(PRODUCT_REPOSITORY);
