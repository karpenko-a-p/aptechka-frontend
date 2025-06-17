import { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;

const Trigger = (props: any) => <div {...props}>Trigger</div>;

export const TooltipStory: Story = {
  args: {
    children: <Trigger />,
    message: 'Tooltip message'
  }
};
