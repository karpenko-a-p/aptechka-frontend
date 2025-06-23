/**
 * Окружение
 */
export class Environment {
  /**
   * JWT secret
   */
  static readonly JWT_SECRET = Environment.readFromEnv('JWT_SECRET');

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
