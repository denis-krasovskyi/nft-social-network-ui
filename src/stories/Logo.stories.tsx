import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo from 'components/ui-kit/Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = () => {
  return (
    <div
      style={{
        maxWidth: '600px',
        padding: '20px',
        background: 'var(--color-white)',
      }}
    >
      <Logo />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {} as React.ComponentProps<typeof Logo>;
