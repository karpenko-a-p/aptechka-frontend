import { parseJwtToken } from 'server/use-cases/parseJwtToken';
import { redirect } from 'next/navigation';
import { ExitButton } from 'src/app/profile/ExitButton';
import Link from 'next/link';
import type { JSX } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import { Container } from 'typedi';
import { UserRepository } from 'server/repositories';

const userRepository = Container.get(UserRepository);

export const revalidate = 0;

/**
 * Профиль пользователя, только для авторизованного юзера
 */
export default async function Page(): Promise<JSX.Element> {
  const tokenPayload = await parseJwtToken();

  if (!tokenPayload)
    redirect('/login');

  const user = await userRepository.getUserById(tokenPayload.id);

  if (!user)
    redirect('/register');

  return (
    <div className="bg-blue-500 p-2 grow flex items-center justify-center">
      <div className="paper flex flex-col w-full max-w-[400px]">
        <h1>Профиль</h1>
        <p className="secondary text-sm mt-0.5">id: {user.id}</p>
        <p className="text-lg">{user.login}</p>

        {/*Cart here*/}

        <div className="flex gap-2 items-center mt-4">
          <Link href="/">
            <button className="small">
              <IconShoppingCart />
              В магазин
            </button>
          </Link>
          <ExitButton className="secondary small" />
        </div>
      </div>
    </div>
  );
}
