import { COUNTER_STORE, ICounterStore } from 'application/abstractions/stores';
import { Service } from 'typedi';
import { makeAutoObservable } from 'mobx';

@Service(COUNTER_STORE)
export class CounterStore implements ICounterStore {
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
