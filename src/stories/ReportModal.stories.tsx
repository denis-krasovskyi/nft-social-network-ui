import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReportModal from '../components/ReportModal';
import Button from '../components/ui-kit/Button';

export default {
  title: 'Components/ReportModal',
  component: ReportModal,
} as ComponentMeta<typeof ReportModal>;

const Template: ComponentStory<typeof ReportModal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        maxWidth: '700px',
        background: 'var(--color-grey-100)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0 20px',
      }}
    >
      <Button onClick={() => setIsOpen(true)}>Open Modal Sheet</Button>

      <ReportModal
        name="Jenny Wilson"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Basic = Template.bind({});
