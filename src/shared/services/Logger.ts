/**
 * Логгер для клиентской и серверной сторон
 */
export abstract class Logger {
  static log(...args: unknown[]): void {
    console.log(`LOG [${new Date().toISOString()}]:`, ...args);
  }

  static info(...args: unknown[]): void {
    console.log(`INFO [${new Date().toISOString()}]:`, ...args);
  }

  static warn(...args: unknown[]): void {
    console.log(`WARN [${new Date().toISOString()}]:`, ...args);
  }

  static error(...args: unknown[]): void {
    console.log(`ERROR [${new Date().toISOString()}]:`, ...args);
  }

  static critical(...args: unknown[]): void {
    console.log(`CRITICAL [${new Date().toISOString()}]:`, ...args);
  }
}
