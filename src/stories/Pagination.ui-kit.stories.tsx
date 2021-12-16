import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pagination from 'components/ui-kit/Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = () => {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '640px',
        padding: '30px 0',
      }}
    >
      <Pagination siblingCount={2} count={57} defaultPage={1} />
      <Pagination siblingCount={2} count={57} defaultPage={57} />
      <Pagination siblingCount={2} count={57} defaultPage={5} />
      <Pagination siblingCount={2} count={57} defaultPage={28} />
      <Pagination siblingCount={2} count={57} defaultPage={53} />
    </div>
  );
};

export const Basic = Template.bind({});
