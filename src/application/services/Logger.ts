import { Service } from 'typedi';

@Service()
export class Logger {
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
