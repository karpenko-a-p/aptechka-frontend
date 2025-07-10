import Link from 'next/link';
import { type JSX } from 'react';

/**
 * Не найдено
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="contaienr my-4 flex gap-4 flex-col items-center justify-center grow">
      <h1>404 😔</h1>
      <p>Страница не найдена или не существует</p>
      <Link href="/">На главную</Link>
    </div>
  );
}
