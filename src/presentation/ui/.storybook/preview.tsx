import type { Preview } from '@storybook/react';
import { inter } from 'presentation/ui/fonts';
import 'presentation/ui/variables/tailwindcss.css';

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
