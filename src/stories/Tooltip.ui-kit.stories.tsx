import React from 'react';
import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from 'components/ui-kit/Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <div
      style={{
        maxWidth: '500px',
        padding: '200px',
        background: 'var(--color-white)',
      }}
    >
      <Tooltip {...args}>
        <Button>Light</Button>
      </Tooltip>
    </div>
  );
};

export const Top = Template.bind({});
Top.args = {
  title: 'You can use handlebars-like variables for chat context like ',
  open: true,
  arrow: true,
  placement: 'top',
} as React.ComponentProps<typeof Tooltip>;

export const Down = Template.bind({});
Down.args = {
  title: 'You can use handlebars-like variables for chat context like ',
  open: true,
  arrow: true,
  placement: 'bottom',
} as React.ComponentProps<typeof Tooltip>;

export const Left = Template.bind({});
Left.args = {
  title: 'You can use handlebars-like variables for chat context like ',
  open: true,
  arrow: true,
  placement: 'left',
} as React.ComponentProps<typeof Tooltip>;

export const Right = Template.bind({});
Right.args = {
  title: 'You can use handlebars-like variables for chat context like ',
  open: true,
  arrow: true,
  placement: 'right',
} as React.ComponentProps<typeof Tooltip>;
