'use client';

import { useService } from 'client/hooks/useService';
import { ViewModel } from './ViewModel';
import Link from 'next/link';
import { type JSX } from 'react';

export default function Page(): JSX.Element {
  const { count } = useService(ViewModel);

  return (
    <div className="container my-4 flex flex-col">
      <h1>Страница с примером использования вью-модели</h1>
      <p>
        Получение значения счетчика из стора осуществляется через <i>сущность посредника</i>
      </p>
      <p className="my-2">Значение счетчика: {count}</p>
      <Link href="/showcase/global-store-using">Перейти к счетчику</Link>
      <br />
      <Link href="/showcase/payload-provider">
        Перейти к примеру с провайдером
      </Link>
    </div>
  );
}
