import { Token } from 'typedi';
import { getService } from 'application/utils';

export interface ILogger {
  log(...args: unknown[]):void;
  info(...args: unknown[]):void;
  warn(...args: unknown[]):void;
  error(...args: unknown[]):void;
  critical(...args: unknown[]):void;
}

export const LOGGER = new Token<ILogger>();

export const logger = () => getService(LOGGER);