import { Category } from 'server/models/Category';
import { Product } from 'server/models/Product';
import 'server-only';
import { Database, IProductEntity } from 'server/database';
import { Cache } from 'server/decorators';

export abstract class ProductRepository {
  /**
   * Запрос для получения продукта по идентификатору
   */
  private static selectProductByIdQuery = Database.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE id = $1
  `);

  @Cache()
  static async getProductById(id: Product['id']): Promise<Nullable<Product>> {
    const { rows } = await ProductRepository.selectProductByIdQuery([id]);

    if (!rows[0]) return null;

    return ProductRepository.entityToModel(rows[0]);
  }

  /**
   * Запрос для получения продуктов по идентификатору категории
   */
  private static selectProductByCategoryIdQuery = Database.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE category_id = $1;
  `);

  @Cache()
  static async getProductsByCategoryId(id: Category['id']): Promise<Product[]> {
    const { rows } = await ProductRepository.selectProductByCategoryIdQuery([id]);
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
