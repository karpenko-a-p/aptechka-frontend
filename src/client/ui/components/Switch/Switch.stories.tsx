import { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  component: Switch,
};

export default meta;

export const SwitchStory: Story = {
  args: {
    children: 'I am switch',
  },
};

export const LongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem doloremque eum nulla obcaecati\n' +
      'quisquam repudiandae suscipit velit vitae, voluptas. Amet animi aperiam atque aut consequuntur deleniti\n' +
      'dignissimos earum eius eum ex explicabo id libero minus nobis obcaecati odit pariatur possimus quae quibusdam\n' +
      'quis quisquam sint sunt tenetur ullam veniam vero, voluptatibus. Ab adipisci alias aut autem beatae consequatur\n' +
      'dolor dolorem doloremque eos, esse eum exercitationem expedita explicabo fugit ipsa ipsam ipsum iste labore\n' +
      'laborum magnam magni nihil nobis nulla obcaecati omnis placeat quae quasi quidem quisquam quos sapiente\n' +
      'temporibus unde vero voluptas voluptatem voluptates voluptatibus! Ad quia ullam veritatis.',
  },
};

export const Error: Story = {
  args: {
    children: 'I am Switch',
    errorMessage: 'I am long error message about Switch',
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'I am Switch',
    disabled: true,
    invalid: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'I am Switch',
    disabled: true,
    checked: true,
  },
};

export const DisabledError: Story = {
  args: {
    children: 'I am Switch',
    errorMessage: 'I am long error message about Switch',
    invalid: true,
    disabled: true,
  },
};

export const CustomElement: Story = {
  args: {
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, <i>consectetur adipisicing elit</i>. Architecto autem doloremque eum nulla
          obcaecati
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur <b>doloremque eum nulla obcaecati</b>
        </p>
      </div>
    ),
  },
};

export const CustomElementWithError: Story = {
  args: {
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, <i>consectetur adipisicing elit</i>. Architecto autem doloremque eum nulla
          obcaecati
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur <b>doloremque eum nulla obcaecati</b>
        </p>
      </div>
    ),
    errorMessage: 'I am long error message about Switch',
    invalid: true,
  },
};
