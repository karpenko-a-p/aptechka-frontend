import { Pool, PoolClient } from 'pg';

export class DatabaseProvider {
  static readonly pool = new Pool({
    host: 'database',
    user: 'user',
    password: 'password',
    port: 5432,
    database: 'aptechka-database'
  });

  static async transaction(callback: (client: PoolClient) => Promise<void>): Promise<void> {
    const client = await DatabaseProvider.pool.connect();
    callback(client).finally(client.release);
  }
}