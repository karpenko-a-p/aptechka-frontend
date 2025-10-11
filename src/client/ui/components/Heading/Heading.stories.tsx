import { Meta, StoryObj } from '@storybook/react';
import { type JSX } from 'react';

const MockSample = (): JSX.Element => <div />;

type Story = StoryObj<typeof MockSample>;

const meta: Meta<typeof MockSample> = {
  component: MockSample,
};

export default meta;

export const HeadingStory: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <h1>H1 Lorem ipsum dolor sit.</h1>
      <h2>H2 Lorem ipsum dolor sit.</h2>
      <h3>H3 Lorem ipsum dolor sit.</h3>
      <h4>H4 Lorem ipsum dolor sit.</h4>
      <h5>H5 Lorem ipsum dolor sit.</h5>
      <h6>H6 Lorem ipsum dolor sit.</h6>
    </div>
  ),
};