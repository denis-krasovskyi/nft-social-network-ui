import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LocationModal from 'components/LocationModal';
import Button from 'components/ui-kit/Button';

export default {
  title: 'Components/LocationModal',
  component: LocationModal,
} as ComponentMeta<typeof LocationModal>;

const Template: ComponentStory<typeof LocationModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        maxWidth: '560px',
        background: 'var(--color-grey-100)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0 20px',
      }}
    >
      <Button onClick={() => setIsOpen(true)}>Open Location Modal</Button>

      <LocationModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  locations: [
    {
      id: 1,
      country: 'Australia',
      city: 'Melbourne',
      selected: false,
    },
    {
      id: 2,
      country: 'Australia',
      city: 'Perth',
      selected: false,
    },
    {
      id: 3,
      country: 'Ukraine',
      city: '',
      selected: false,
    },
    {
      id: 4,
      country: 'United Kingdom',
      selected: false,
    },
    {
      id: 5,
      country: 'Laos',
      city: '',
      selected: false,
    },
  ],
} as React.ComponentProps<typeof LocationModal>;
