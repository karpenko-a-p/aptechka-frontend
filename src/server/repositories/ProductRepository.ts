import { Category } from 'server/models/Category';
import { Product } from 'server/models/Product';
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
  static async getProductById(id: Product['id']): Promise<Nullable<Product>> {
    const cachedRow = await DistCache.get<IProductEntity>(`getProductById(${id})`);

    if (cachedRow) {
      return ProductRepository.entityToModel(cachedRow);
    }

    const { rows: [productEntity] } = await ProductRepository.selectProductByIdQuery([id]);

    await DistCache.setWithTags(`getProductById(${id})`, productEntity, ['products'], DistCache.ONE_HOUR);

    return productEntity && ProductRepository.entityToModel(productEntity);
  }

  /**
   * Запрос для получения продуктов по идентификатору категории
   */
  private static selectProductByCategoryIdQuery = Database.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE category_id = $1;
  `);

  @Cache()
  static async getProductsByCategoryId(id: Category['id']): Promise<Product[]> {
    const cachedRows = await DistCache.get<IProductEntity[]>(`getProductsByCategoryId(${id})`);

    if (cachedRows) {
      return cachedRows.map(ProductRepository.entityToModel);
    }

    const { rows } = await ProductRepository.selectProductByCategoryIdQuery([id]);

    await DistCache.setWithTags(`getProductsByCategoryId(${id})`, rows, ['products', 'categories'], DistCache.ONE_HOUR);

    return rows.map(ProductRepository.entityToModel);
  }

  /**
   * Маппинг сущности из БД к модели
   */
  private static entityToModel(entity: IProductEntity): Product {
    const product = new Product();
    product.id = entity.id;
    product.name = entity.name;
    product.description = entity.description;
    // остальные поля, но мне уже лень разрабатывать =)

    return product;
  }
}
