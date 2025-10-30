import 'server-only';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { Environment } from 'server/services/Environment';

export abstract class Database {
  /**
   * Пул клиентов для работы с БД
   */
  private static readonly pool = new Pool({ connectionString: Environment.DATABASE_CONNECTION_STRING });

  /**
   * Шорткат для запроса
   */
  static readonly query = Database.pool.query.bind(Database.pool);

  /**
   * Оптимизация запроса
   */
  static compileQuery<TRow extends QueryResultRow>(query: string) {
    const optimizedQuery = query.replaceAll(/\s{2,}/g, ' ').trim();
    return (args?: unknown[]): Promise<QueryResult<TRow>> => Database.query<TRow>(optimizedQuery, args);
  }

  /**
   * Транзакция
   */
  static async transaction<TResult = void>(callback: (client: PoolClient) => Promise<TResult>): Promise<TResult> {
    const client = await Database.pool.connect();

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
