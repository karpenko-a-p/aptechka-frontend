import { Meta, StoryObj } from '@storybook/react';
import { type JSX } from 'react';

const MockSample = (): JSX.Element => <div />;

type Story = StoryObj<typeof MockSample>;

const meta: Meta<typeof MockSample> = {
  component: MockSample,
};

export default meta;

export const TextStory: Story = {
  render: () => (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur excepturi minus rem sunt?
      Assumenda debitis in inventore omnis possimus, praesentium quis sequi tempore voluptatibus.{' '}
    </p>
  ),
};

export const TextSecondaryStory: Story = {
  render: () => (
    <p className="secondary">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur excepturi minus rem sunt?
      Assumenda debitis in inventore omnis possimus, praesentium quis sequi tempore voluptatibus.{' '}
    </p>
  ),
};

export const TextStrongStory: Story = {
  render: () => (
    <p>
      Lorem ipsum <strong>dolor sit amet, consectetur adipisicing elit.</strong> Assumenda consequuntur excepturi minus
      rem sunt? Assumenda debitis in inventore omnis possimus, praesentium quis sequi tempore voluptatibus.{' '}
    </p>
  ),
};
