'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div className="container my-4 grow flex flex-col gap-4 items-center justify-center">
      <h1>Ошибка 👉👈</h1>
      <p className="secondary">Произошла непредвиденная ошибка</p>
      <Link href="/">На главную</Link>
    </div>
  );
}
