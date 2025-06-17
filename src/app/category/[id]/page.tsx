import { Metadata } from 'next';
import { categoryRepository } from 'application/abstractions/repositories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Input } from 'presentation/ui/components/Input/Input';

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

      <div className="flex flex-col gap-2 mb-4">
        <Input label="Lorem ipsum strong sit amet" placeholder="Placeholder" />
        <Input label="Lorem ipsum strong sit amet" required />
        <Input label="Lorem ipsum strong sit amet" type="password" />
        <Input label="Lorem ipsum strong sit amet" type="number" />
        <Input label="Lorem ipsum strong sit amet" disabled />
        <Input label="Lorem ipsum strong sit amet" disabled invalid errorMessage="I am invalid" />
        <Input label="Lorem ipsum strong sit amet" invalid errorMessage="I am invalid" description="I am description" />
      </div>

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
