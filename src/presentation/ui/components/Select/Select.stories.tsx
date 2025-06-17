import { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

export const SelectStory: Story = {
  args: {
    children: (
      <>
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  render: () => (
    <Select disabled={true}>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <Select placeholder="Select something">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const PlaceholderDisabled: Story = {
  render: () => (
    <Select placeholder="Select something" disabled={true}>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Error: Story = {
  render: () => (
    <Select hasError={true} errorMessage="Something went wrong">
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const ErrorDisabled: Story = {
  render: () => (
    <Select hasError={true} errorMessage="Something went wrong" disabled={true}>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const Description: Story = {
  render: () => (
    <Select description="Select most interest">
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
      hasError={true}
      errorMessage="Something went wrong"
      disabled={true}
      label="Ineristings"
      star={true}
    >
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </Select>
  ),
};

export const SizesStory: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <Select size="xs">
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </Select>
      <Select size="sm">
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </Select>
      <Select size="md">
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </Select>
      <Select size="lg">
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </Select>
      <Select size="xl">
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </Select>
    </div>
  ),
};
