import { IconCheck, IconComet, IconThumbUp } from '@tabler/icons-react';
import Link from 'next/link';
import { userRepository, categoryRepository, newsRepository } from 'application/abstractions/repositories';
import Image from 'next/image';
import { Metadata } from 'next';
import { UserInformation } from 'presentation/components/UserInformation';
import { UserLogin } from 'presentation/components/UserLogin';
import { cookies } from 'next/headers';
import { jwtService } from 'application/abstractions/services';
import { AUTHORIZATION_COOKIE_NAME } from 'application/constants/auth';

const { getCategories } = categoryRepository();
const { getNewUsersDiscount, getNews } = newsRepository();
const { getUserById } = userRepository();
const { getTokenPayload } = jwtService();

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [categories, discount] = await Promise.all([getCategories(), getNewUsersDiscount()]);

  return {
    title: 'Аптечка | Добро пожаловать',
    description: `Поиск лекарств по досутпным ценам | Скидки новым пользователям до ${discount}% | ${categories.length} категорий товаров`,
    keywords: categories
      .map((category) => category.keysWords)
      .flat(Infinity)
      .join(','),
  };
}

export default async function Page() {
  const cookie = await cookies();
  const tokenPayload = getTokenPayload(cookie.get(AUTHORIZATION_COOKIE_NAME)?.value as string);

  const [categories, discount, news, user] = await Promise.all([
    getCategories(),
    getNewUsersDiscount(),
    getNews(),
    tokenPayload ? getUserById(tokenPayload.id) : Promise.resolve(null),
  ]);

  return (
    <div className="flex grow flex-col container mt-4">
      <div className="flex items-center mb-4 gap-10 max-mobile:gap-4 justify-between">
        <h1 className="logo">
          Аптечка
        </h1>

        {user ? <UserInformation user={user} /> : <UserLogin />}
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis culpa illo, minus nam non ratione! Ab
        architecto assumenda atque cupiditate delectus deserunt ducimus eaque eligendi harum hic, impedit ipsa iste,
        iusto laborum laudantium modi neque optio, perferendis provident quasi reprehenderit tempora tenetur unde veniam
        veritatis vero voluptatibus! At aut autem consectetur, consequatur dolore doloribus nemo nihil
      </p>

      <div className="flex flex-wrap gap-2 my-4">
        <p className="badge green">
          <IconCheck />
          Быстро
        </p>
        <p className="badge blue">
          <IconThumbUp />
          Надежно
        </p>
        <p className="badge">
          <IconComet />
          Удобно
        </p>
      </div>

      <h2 className="mb-2">Выберите категорию</h2>

      <ul className="grid grid-cols-2 gap-4 max-mobile:grid-cols-1 max-mobile:gap-2">
        {categories.map(({ id, name, description, banner, keysWords }) => (
          <li key={id}>
            <Link
              className="flex flex-col no-underline h-full border-2 border-gray-200 rounded-xl overflow-hidden p-2 w-full active:border-blue-500 hover:border-blue-500 transition"
              href={`category/${id}`}
            >
              <Image
                src={banner}
                alt={name}
                width={400}
                height={200}
                className="object-cover object-center w-full h-[25vh] rounded-lg select-none pointer-events-none"
              />
              <ul className="flex mt-2 gap-1.5 flex-wrap">
                {keysWords.map((word) => (
                  <li key={word}>
                    <p className="badge">{word}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-2 mb-0.5 max-mobile:mt-2">{name}</h3>
              <p className="text-sm mb-1 grow">{description}</p>
              <p className="link text-xs hover:no-underline">Перейтив каталог</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="secondary text-xs mt-2">
        Скидки <strong>{discount}%</strong> для новых покупателей
      </p>

      <h3 className="mt-4">Новости</h3>
      <p className="text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, natus.</p>

      <ul className="grid grid-cols-3 gap-4 max-tablet:grid-cols-2 max-tablet:gap-3 max-mobile:grid-cols-1 max-mobile:gap-2">
        {news.map(({ id, name, content, date }) => (
          <li className="flex flex-col p-4 bg-gray-200/80 rounded-lg" key={id}>
            <h4 className="text-base">{name}</h4>
            <p className="text-sm grow mb-2">{content}</p>
            <p className="text-xs text-gray-400">{date.toISOString()}</p>
          </li>
        ))}
      </ul>

      <Link href="/politics" className="my-4 mx-auto text-xs">
        Политика конфиденциальности
      </Link>
    </div>
  );
}
