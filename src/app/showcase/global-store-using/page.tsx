import { Counter } from './Counter';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="container flex flex-col my-4">
      <h1>Страница с примером использования сторов</h1>
      <p className="mb-4">Пример использования стора для обычного счетчика</p>
      <Counter />
      <Link href="/showcase/with-view-model" className="mt-2">
        Пример чтения счетчика из вью-модели
      </Link>
      <br />
      <Link href="/showcase/payload-provider">Перейти к примеру с провайдером</Link>
    </div>
  );
}
