import { Product } from 'application/models/Product';
import { Category } from 'application/models/Category';
import { Container, Token } from 'typedi';

export interface IProductRepository {
  /**
   * Получение продукта по идентификатору
   */
  getProductById(id: Product['id']): Promise<Nullable<Product>>;

  /**
   * Получение всех продуктов относящихся к определенной категории
   */
  getProductsByCategoryId(id: Category['id']): Promise<Product[]>;
}

export const PRODUCT_REPOSITORY = new Token<IProductRepository>();

export const productRepository = (): IProductRepository => Container.get(PRODUCT_REPOSITORY);
