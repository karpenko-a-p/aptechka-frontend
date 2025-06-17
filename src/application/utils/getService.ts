import { Constructable, Container, Token } from 'typedi';

/**
 * Получение сервиса из DI контейнера
 */
export const getService = <TService>(type: Constructable<TService> | Token<TService>) => {
  return Container.get(type as Constructable<TService>);
};
