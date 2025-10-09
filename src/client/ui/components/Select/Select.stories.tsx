import { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

export const SelectStory: Story = {
  args: {
    label: 'Select',
    children: (
      <>
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </>
    ) as unknown as React.ReactElement<HTMLOptionElement>[],
  },
};

export const Disabled: Story = {
  render: () => (
    <Select disabled label="Select">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <Select label="Select">
      <option hidden selected>Select something</option>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const PlaceholderDisabled: Story = {
  render: () => (
    <Select disabled label="Select">
      <option hidden selected>Select something</option>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Error: Story = {
  render: () => (
    <Select invalid label="Select" errorMessage="Something went wrong">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const ErrorDisabled: Story = {
  render: () => (
    <Select invalid errorMessage="Something went wrong" disabled label="Select">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Description: Story = {
  render: () => (
    <Select description="Select most interest" label="Select">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const AllElements: Story = {
  render: () => (
    <Select
      placeholder="Select something"
      description="Select most interest"
      invalid
      errorMessage="Something went wrong"
      disabled
      label="Ineristings"
      required
    >
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};
