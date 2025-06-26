import { Token } from 'typedi';

export interface ICounterStore {
  /**
   * Получение значени счетчика
   */
  getCount(): number;

  /**
   * Инкремент
   */
  increment(): void;

  /**
   * Декремент
   */
  decrement(): void;
}

export const COUNTER_STORE = new Token<ICounterStore>();
