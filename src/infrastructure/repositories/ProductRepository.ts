import { Category } from 'infrastructure/models/Category';
import { Product } from 'infrastructure/models/Product';
import { Service } from 'typedi';
import 'server-only';
import { DatabaseProvider } from 'infrastructure/repositories/DatabaseProvider';
import { Bind, Cache } from 'infrastructure/decorators';

interface IProductEntity {
  id: number;
  name: string;
  description: string;
  category_id: string;
}

@Service()
export class ProductRepository {
  /**
   * Запрос для получения продукта по идентификатору
   */
  private static selectProductByIdQuery = DatabaseProvider.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE id = $1
  `);

  @Cache()
  @Bind()
  async getProductById(id: Product['id']): Promise<Nullable<Product>> {
    const { rows } = await ProductRepository.selectProductByIdQuery([id]);

    if (!rows[0]) return null;

    return ProductRepository.entityToModel(rows[0]);
  }

  /**
   * Запрос для получения продуктов по идентификатору категории
   */
  private static selectProductByCategoryIdQuery = DatabaseProvider.compileQuery<IProductEntity>(`
    SELECT * FROM products WHERE category_id = $1;
  `);

  @Cache()
  @Bind()
  async getProductsByCategoryId(id: Category['id']): Promise<Product[]> {
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
