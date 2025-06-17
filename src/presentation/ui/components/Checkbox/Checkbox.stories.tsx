import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

export const CheckboxStory: Story = {
  args: {
    children: 'I am checkbox',
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

export const Sizes: Story = {
  render: () => (
    <>
      <div style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
        <p>Default</p>
        <Checkbox>Lorem ipsum dolor sit amet</Checkbox>
        <Checkbox>Lorem ipsum dolor sit amet</Checkbox>
      </div>
      <div style={{ gap: 24, display: 'flex', flexDirection: 'column', marginTop: 32 }}>
        <p>Error</p>
        <Checkbox invalid errorMessage="Has error!">
          Lorem ipsum dolor sit amet
        </Checkbox>
        <Checkbox invalid errorMessage="Has error!">
          Lorem ipsum dolor sit amet
        </Checkbox>
      </div>
    </>
  ),
};

export const Error: Story = {
  args: {
    children: 'I am checkbox',
    errorMessage: 'I am long error message about checkbox',
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'I am checkbox',
    disabled: true,
    invalid: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'I am checkbox',
    disabled: true,
    checked: true,
  },
};

export const DisabledError: Story = {
  args: {
    children: 'I am checkbox',
    errorMessage: 'I am long error message about checkbox',
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
    errorMessage: 'I am long error message about checkbox',
    invalid: true,
  },
};
