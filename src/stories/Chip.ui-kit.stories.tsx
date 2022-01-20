import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chip from 'components/ui-kit/Chip';

import { ReactComponent as CheckIcon } from 'assets/icons/icon-done.svg';

export default {
  title: 'Components/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => {
  return (
    <div
      style={{
        maxWidth: '300px',
        padding: '20px',
        background: 'var(--color-white)',
      }}
    >
      <Chip {...args} />
    </div>
  );
};

export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
  selected: false,
  label: 'Available for work',
  clickable: true,
  onDelete: undefined,
} as React.ComponentProps<typeof Chip>;

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  selected: false,
  label: 'Status',
  clickable: true,
  onDelete: undefined,
  icon: <CheckIcon />,
} as React.ComponentProps<typeof Chip>;

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'filled',
  label: 'menu planning',
  color: 'secondary',
  onDelete: undefined,
} as React.ComponentProps<typeof Chip>;
