import { Counter } from './Counter';

export default function Page() {
  return (
    <div className="container flex flex-col my-4">
      <h1>Страница с примером использования сторов</h1>
      <p className="mb-4">Пример использования стора для обычного счетчика</p>
      <Counter />
    </div>
  );
}
