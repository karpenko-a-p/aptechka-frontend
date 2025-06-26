import { Inject, Service } from 'typedi';
import { COUNTER_STORE, type ICounterStore } from 'application/abstractions/stores';

@Service()
export class ViewModel {
  @Inject(COUNTER_STORE)
  private readonly counterStore!: ICounterStore;

  /**
   * Получение значение счетчика из глобального стора
   */
  get count() {
    return this.counterStore.getCount();
  }
}