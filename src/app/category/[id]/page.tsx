import { Metadata } from 'next';
import { categoryRepository } from 'application/abstractions/repositories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Select } from 'presentation/ui/components/Select/Select';

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
        <Select label="Selectik">
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>


        <Select label="Selectik placeholder">
          <option selected hidden>placeholderrrr</option>
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>


        <Select label="Selectik 2" placeholder="placeholderr" required>
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>


        <Select label="Selectik 2" placeholder="placeholderr" required disabled>
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>


        <Select label="Selectik 2" placeholder="placeholderr" invalid errorMessage="Error" description="Desc">
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>

        <Select label="Selectik 2" placeholder="placeholderr" disabled required invalid errorMessage="Error" description="Desc">
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
        </Select>
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
