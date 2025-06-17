import { ILogger, LOGGER } from 'application/abstractions/services/ILogger';
import { Service } from 'typedi';

@Service(LOGGER)
export class Logger implements ILogger {
  log(...args: unknown[]): void {
    console.log(`LOG [${new Date().toISOString()}]:`, ...args);
  }

  info(...args: unknown[]): void {
    console.log(`INFO [${new Date().toISOString()}]:`, ...args);
  }

  warn(...args: unknown[]): void {
    console.log(`WARN [${new Date().toISOString()}]:`, ...args);
  }

  error(...args: unknown[]): void {
    console.log(`ERROR [${new Date().toISOString()}]:`, ...args);
  }

  critical(...args: unknown[]): void {
    console.log(`CRITICAL [${new Date().toISOString()}]:`, ...args);
  }
}
