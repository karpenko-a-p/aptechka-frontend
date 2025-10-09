import type { Preview } from '@storybook/react';
import 'client/ui/tailwindcss.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <main className={inter.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
