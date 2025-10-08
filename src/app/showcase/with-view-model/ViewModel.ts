import { Service } from 'typedi';
import { CounterStore } from 'presentation/stores';

@Service()
export class ViewModel {
  constructor(private readonly counterStore: CounterStore) {}

  /**
   * Получение значение счетчика из глобального стора
   */
  get count(): number {
    return this.counterStore.getCount();
  }
}
