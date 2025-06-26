import { PayloadProvider } from 'presentation/providers/PayloadProvider';
import { PayloadConsumer } from './PayloadConsumer';
import Link from 'next/link';

export default async function Page() {
  const somePayload = ['you', 'looks', 'good', 'as', 'usual'];

  return (
    <PayloadProvider payload={somePayload}>
      <div className="container flex flex-col my-4">
        <h1>Пример использования контекста чтобы прокинуть данные в дочерний компонент</h1>
        <p>Клиентский компонент ниже получает данные из контекста</p>
        <PayloadConsumer />
        <Link href="/showcase/global-store-using" className="mt-2">Перейти к счетчику</Link>
        <br/>
        <Link href="/showcase/with-view-model">
          Пример чтения счетчика из вью-модели
        </Link>
      </div>
    </PayloadProvider>
  );
}
