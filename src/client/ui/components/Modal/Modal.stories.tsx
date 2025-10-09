import { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'client/hooks';

import { Modal } from './Modal';
import React from 'react';

type Story = StoryObj<typeof Modal>;

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

export const ModalStory: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { value, toggle } = useBoolean();

    return (
      <>
        <p onClick={toggle}>open</p>

        <Modal open={value} onClose={toggle}>
          <h6 onClick={toggle}>Heading</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, nostrum!</p>
        </Modal>
      </>
    );
  },
};
