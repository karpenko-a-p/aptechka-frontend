import { IProductRepository, PRODUCT_REPOSITORY } from 'application/abstractions/repositories';
import { Category } from 'application/models/Category';
import { Product } from 'application/models/Product';
import { Service } from 'typedi';
import { cache } from 'react';
import 'server-only';

@Service(PRODUCT_REPOSITORY)
export class ProductRepository implements IProductRepository {
  private readonly products: Product[] = [];

  constructor() {
    this.getProductsByCategoryId = cache(this.getProductsByCategoryId.bind(this));
    this.getProductById = cache(this.getProductById.bind(this));
  }

  getProductById(id: Product['id']): Product | null {
    return this.products.find((product) => product.id === id) ?? null;
  }

  getProductsByCategoryId(id: Category['id']): Product[] {
    return this.products.slice(2);
  }
}
