/**
 * Связывание контекста
 */
export function Bind() {
  return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
    if (!descriptor || typeof descriptor.value !== 'function')
      throw new TypeError(`Only methods can be decorated with @Bind. '${propertyKey}' is not a method!`);

    descriptor.value = descriptor.value.bind(target);
  };
}
