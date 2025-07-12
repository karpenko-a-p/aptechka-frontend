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

  /**
   * @inheritDoc
   */
  getCount(): number {
    return this.count;
  }

  /**
   * @inheritDoc
   */
  increment(): void {
    this.count += 1;
  }

  /**
   * @inheritDoc
   */
  decrement(): void {
    this.count -= 1;
  }
}
