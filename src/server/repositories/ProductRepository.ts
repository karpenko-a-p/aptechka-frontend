import { ICategory } from 'server/models/Category';
import { IProduct, Product } from 'server/models/Product';
import 'server-only';
import { Database, IProductEntity } from 'server/database';
import { Cache } from 'server/decorators';
import { DistCache } from 'server/cache';

export abstract class ProductRepository {
  /**
   * Запрос для получения продукта по идентификатору
   */
  private static selectProductByIdQuery = Database.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE id = $1
  `);

  @Cache()
  static async getProductById(id: IProduct['id']): Promise<Nullable<IProduct>> {
    const tag = `getProductById(${id})`;

    const { cached, payload: cachedProduct } = await DistCache.get<Nullable<IProduct>>(tag);

    if (cached) return cachedProduct;

    const { rows: [productEntity = null] } = await ProductRepository.selectProductByIdQuery([id]);

    const product = productEntity && ProductRepository.entityToModel(productEntity);

    await DistCache.setWithTags(tag, product, ['products'], DistCache.ONE_HOUR);

    return product;
  }

  /**
   * Запрос для получения продуктов по идентификатору категории
   */
  private static selectProductByCategoryIdQuery = Database.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE category_id = $1;
  `);

  @Cache()
  static async getProductsByCategoryId(id: ICategory['id']): Promise<IProduct[]> {
    const tag = `getProductsByCategoryId(${id})`;

    const { cached, payload: cachedProducts } = await DistCache.get<IProduct[]>(tag);

    if (cached) return cachedProducts;

    const { rows } = await ProductRepository.selectProductByCategoryIdQuery([id]);

    const products = rows.map(ProductRepository.entityToModel);

    await DistCache.setWithTags(tag, rows, ['products', 'categories'], DistCache.ONE_HOUR);

    return products;
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: IProductEntity): IProduct {
    return Product.new(entity.id, entity.name, entity.description, '');
  }
}
