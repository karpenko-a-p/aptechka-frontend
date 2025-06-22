import { Pool, PoolClient } from 'pg';

export class DatabaseProvider {
  static readonly pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    port: 5432,
    database: 'aptechka_database'
  });

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