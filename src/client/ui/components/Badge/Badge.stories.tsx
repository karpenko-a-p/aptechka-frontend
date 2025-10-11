import { Meta, StoryObj } from '@storybook/react';
import { type JSX } from 'react';
import { Icon12Hours } from '@tabler/icons-react';

const MockSample = (): JSX.Element => <div />;

type Story = StoryObj<typeof MockSample>;

const meta: Meta<typeof MockSample> = {
  component: MockSample,
};

export default meta;

export const BadgeStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <p className="badge">Lorem ipsum dolor.</p>
      <p className="badge green">Lorem ipsum dolor.</p>
      <p className="badge blue">Lorem ipsum dolor.</p>
    </div>
  ),
};

export const BadgeIconStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <p className="badge">
        <Icon12Hours />
        Lorem ipsum dolor.
      </p>
      <p className="badge">
        <Icon12Hours />
        Lorem ipsum dolor.
        <Icon12Hours />
      </p>
      <p className="badge green">
        Lorem ipsum dolor.
        <Icon12Hours />
      </p>
    </div>
  ),
};
