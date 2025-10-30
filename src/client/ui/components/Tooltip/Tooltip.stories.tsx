import { Meta, StoryObj } from '@storybook/react';

import { Tooltip, Placement } from './Tooltip';

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;

const Trigger = (props: any): any => <span {...props}>Trigger</span>;

export const TooltipStory: Story = {
  args: {
    children: <Trigger />,
    message: 'Tooltip message',
  },
};

export const PlacementStory: Story = {
  render: () => (
    <Tooltip message="I am message" placement={Placement.Right}>
      <Trigger />
    </Tooltip>
  ),
};