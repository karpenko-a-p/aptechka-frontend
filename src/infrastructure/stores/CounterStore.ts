import { Service } from 'typedi';
import { makeAutoObservable } from 'mobx';

@Service()
export class CounterStore {
  /**
   * Счетчик
   */
  private count = 0;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  getCount(): number {
    return this.count;
  }

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }
}
