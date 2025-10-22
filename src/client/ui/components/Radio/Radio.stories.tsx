import { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;

export const RadioStory: Story = {
  args: {
    children: 'I am Radio',
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

export const Radios: Story = {
  render: () => (
    <div style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
      <Radio name="radio">Lorem ipsum dolor sit amet</Radio>
      <Radio name="radio">Lorem ipsum dolor sit amet</Radio>
      <Radio name="radio">Lorem ipsum dolor sit amet</Radio>
    </div>
  ),
};

export const RadiosWithPropsChecked: Story = {
  render: () => (
    <div style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
      <Radio checked name="radio2">
        This will be checked forever because has static attr (checked)
      </Radio>
      <Radio name="radio2">Lorem ipsum dolor sit amet</Radio>
      <Radio name="radio2">Lorem ipsum dolor sit amet</Radio>
    </div>
  ),
};

export const RadiosMixed: Story = {
  render: () => (
    <div style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
      <Radio name="radio3">
        <p>Lorem ipsum dolor sit amet</p>
      </Radio>
      <Radio name="radio3" disabled>Lorem ipsum dolor sit amet</Radio>
      <Radio name="radio3" invalid errorMessage="Error!">Lorem ipsum dolor sit amet</Radio>
      <Radio name="radio3" disabled invalid errorMessage="Error! again...">Lorem ipsum dolor sit amet</Radio>
    </div>
  ),
};

export const Error: Story = {
  args: {
    children: 'I am Radio',
    errorMessage: 'I am long error message about Radio',
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'I am Radio',
    disabled: true,
    invalid: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'I am Radio',
    disabled: true,
    checked: true,
  },
};

export const DisabledError: Story = {
  args: {
    children: 'I am Radio',
    errorMessage: 'I am long error message about Radio',
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
    errorMessage: 'I am long error message about Radio',
    invalid: true,
  },
};
