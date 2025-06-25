import { Pool, PoolClient, QueryResultRow } from 'pg';
import { Environment } from 'application/utils/Environment';

export class DatabaseProvider {
  /**
   * Пул клиентов для работы с БД
   */
  static readonly pool = new Pool({ connectionString: Environment.DATABASE_CONNECTION_STRING });

  /**
   * Оптимизация запроса
   */
  static compileQuery<TRow extends QueryResultRow>(query: string ) {
    const optimizedQuery = query.replaceAll(/\s{2,}/, ' ');
    return (args?: unknown[]) => DatabaseProvider.pool.query<TRow>(optimizedQuery, args);
  }

  /**
   * Транзакция
   */
  static async transaction<TResult = void>(callback: (client: PoolClient) => Promise<TResult>): Promise<TResult> {
    const client = await DatabaseProvider.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
