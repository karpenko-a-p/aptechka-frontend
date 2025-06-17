import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Drawer } from './Drawer';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

export const DrawerStory: Story = {
  args: {
    open: false,
    onClose: () => {},
    size: 'md',
    placement: 'right',
  },
};

export const DrawerOpenable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer open={open} onClose={() => setOpen(false)}>Drawer content</Drawer>
      </>
    );
  },
};

export const DrawerOpenableSm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer open={open} size="sm" onClose={() => setOpen(false)}>Drawer content</Drawer>
      </>
    );
  },
};

export const DrawerOpenableLg: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer open={open} size="lg" onClose={() => setOpen(false)}>Drawer content</Drawer>
      </>
    );
  },
};

export const DrawerOpenableLgDown: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer open={open} size="lg" placement="down" onClose={() => setOpen(false)}>Drawer content</Drawer>
      </>
    );
  },
};

export const DrawerOpenableLgLeft: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Drawer open={open} size="lg" placement="left" onClose={() => setOpen(false)}>Drawer content</Drawer>
      </>
    );
  },
};