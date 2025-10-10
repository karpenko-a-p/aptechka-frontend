import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { type JSX } from 'react';
import { CategoryRepository, ProductRepository } from 'server/repositories';

export const revalidate = 300;

export async function generateMetadata({ params }: RouteSegment<'id'>): Promise<Metadata> {
  const category = await CategoryRepository.getCategoryById((await params).id);

  if (!category) notFound();

  return {
    title: `Аптечка | ${category.name}`,
    description: category.description,
    keywords: category.keywords,
  };
}

export default async function Page({ params }: RouteSegment<'id'>): Promise<JSX.Element> {
  const categoryId = (await params).id;

  const [category, products] = await Promise.all([
    CategoryRepository.getCategoryById(categoryId),
    ProductRepository.getProductsByCategoryId(categoryId)
  ]);

  if (!category)
    notFound();

  return (
    <div className="container grow flex flex-col my-4">
      <h1>{category.name}</h1>
      <Link className="mt-1 mb-4" href="/">
        На главную
      </Link>

      <h2>Продукты</h2>
      <ul className="flex flex-col gap-2 my-2">
        {products.map(({ id, name, description }) => (
          <li key={id}>
            <Link href={`product/${id}`} className="no-underline w-full hover:bg-gray-200 transition p-2 border border-1 border-gray-200 rounded-lg">
              <h3>{name}</h3>
              <p>{description}</p>
              <p>Цена: <strong>Бесплатно</strong></p>
              <p className="secondary text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, illum?</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
