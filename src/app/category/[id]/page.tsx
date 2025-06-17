import { Metadata } from 'next';
import { categoryRepository } from 'application/abstractions/repositories';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const { getCategoryById } = categoryRepository();

export const revalidate = 300;

export async function generateMetadata({ params }: RouteSegment<'id'>): Promise<Metadata> {
  const category = await getCategoryById((await params).id);

  if (!category) notFound();

  return {
    title: `Аптечка | ${category.name}`,
    description: category.description,
    keywords: category.keysWords,
  };
}

type Props = RouteSegment<'id'> & SearchParams<'page'>;

export default async function Page({ params, searchParams }: Props) {
  const category = await getCategoryById((await params).id);
  const { page } = await searchParams;

  if (!category) notFound();

  return (
    <div className="container grow flex flex-col my-4">
      <h1>{category.name}</h1>
      <Link className="mt-1 mb-4" href="/">
        На главную
      </Link>

      <div className="flex grow gap-2">
        <div className="flex-1 rounded-lg border-2 border-gray-200 p-2">
          <h2 className="text-base">Фильтры</h2>
        </div>

        <div className="flex-3">
          <p>Products</p>
        </div>
      </div>
    </div>
  );
}
