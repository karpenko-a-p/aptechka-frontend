import { cache } from 'react';

/**
 * Кэширование в рамках запроса в серверных компонентах
 */
export function Cache() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!descriptor || typeof descriptor.value !== 'function')
      throw new TypeError(`Only methods can be decorated with @Cache. '${propertyKey}' is not a method!`);

    descriptor.value = cache(descriptor.value);
  };
}
