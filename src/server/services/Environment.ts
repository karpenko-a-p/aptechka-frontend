import 'server-only';

/**
 * Окружение
 */
export abstract class Environment {
  /**
   * JWT secret
   */
  static readonly JWT_SECRET = Environment.readFromEnv('JWT_SECRET');

  /**
   * Строка подключения к БД
   */
  static readonly DATABASE_CONNECTION_STRING = Environment.readFromEnv('DATABASE_CONNECTION_STRING');

  /**
   * Строка подключения к кэшу
   */
  static readonly CACHE_CONNECTION_STRING = Environment.readFromEnv('CACHE_CONNECTION_STRING');

  /**
   * Фаза приложения
   */
  static readonly NEXT_PHASE = Environment.readFromEnv('NEXT_PHASE');

  /**
   * Чтение переменной окружения
   */
  private static readFromEnv(key: string): string {
    const value = process.env[key];

    if (!value)
      throw new Error('Отсутствует обязательная переменная окружения: ' + key);

    return value;
  }
}
