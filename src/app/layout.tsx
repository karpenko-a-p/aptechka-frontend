import 'reflect-metadata';
import type { Metadata } from 'next';
import 'client/ui/tailwindcss.css';
import { Providers } from 'client/components/Providers';
import { Inter } from 'next/font/google';
import { type JSX } from 'react';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Аптечка',
  description: 'Аптечка | Онлайн аптека',
  keywords: 'Аптека,онлайн,лекарства',
};

/**
 * Корневая размета
 */
export default function RootLayout({ children }: Children): JSX.Element {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
