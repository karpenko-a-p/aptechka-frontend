import { useRef } from 'react';
import { Constructable, Container, Token } from 'typedi';

/**
 * Получение сервиса из контейнера
 */
export const useService = <TService>(service: Constructable<TService> | Token<TService>) => {
  const serviceRef = useRef<TService>();

  if (!serviceRef.current)
    serviceRef.current = Container.get(service as Constructable<TService>);

  return serviceRef.current;
};
