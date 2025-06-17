import { Meta, StoryObj } from '@storybook/react';

import { Progress } from './Progress';

type Story = StoryObj<typeof Progress>;

const meta: Meta<typeof Progress> = {
  component: Progress,
};

export default meta;

export const ProgressStory: Story = {
  args: {
    value: 50,
    of: 100
  }
};
