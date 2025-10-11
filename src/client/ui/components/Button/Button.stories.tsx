import { Meta, StoryObj } from '@storybook/react';
import { type JSX } from 'react';
import { Icon12Hours } from '@tabler/icons-react';

const MockSample = (): JSX.Element => <div />;

type Story = StoryObj<typeof MockSample>;

const meta: Meta<typeof MockSample> = {
  component: MockSample,
};

export default meta;

export const ButtonStory: Story = {
  render: () => <button>Button</button>,
};

export const ButtonVariantsStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <button>Button</button>
      <button className="secondary">Button</button>
    </div>
  ),
};

export const ButtonSizesStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <button className="big">Button</button>
      <button>Button</button>
      <button className="small">Button</button>
    </div>
  ),
};

export const ButtonIconsStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <button>
        <Icon12Hours />
        Button
      </button>
      <button>
        Button
        <Icon12Hours />
      </button>
      <button>
        <Icon12Hours />
        Button
        <Icon12Hours />
      </button>
      <button className="secondary">
        <Icon12Hours />
        Button
      </button>
      <button className="secondary">
        Button
        <Icon12Hours />
      </button>
      <button className="secondary">
        <Icon12Hours />
        Button
        <Icon12Hours />
      </button>
    </div>
  ),
};

export const ButtonSizesWithIconsStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <button className="big">
        <Icon12Hours />
        Button
      </button>
      <button>
        <Icon12Hours />
        Button
      </button>
      <button className="small">
        <Icon12Hours />
        Button
      </button>
    </div>
  ),
};
