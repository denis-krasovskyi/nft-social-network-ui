/* eslint-disable no-alert */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScreenHeader from 'components/ScreenHeader';
import Button from 'components/ui-kit/Button';

import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';

export default {
  title: 'Components/ScreenHeader',
  component: ScreenHeader,
  argTypes: {
    onBackButtonClick: { defaultValue: null },
  },
  parameters: {
    controls: { exclude: ['right'] },
  },
} as ComponentMeta<typeof ScreenHeader>;

const Template: ComponentStory<typeof ScreenHeader> = ({ ...args }) => {
  const style = {
    background: '#ffffff',
    maxWidth: 375,
    margin: '8px 0',
  };

  return (
    <div style={style}>
      <ScreenHeader {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  onBackButtonClick: () => alert('onBackButtonClick'),
  title: 'Add a location',
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  onBackButtonClick: () => alert('onBackButtonClick'),
  title: 'Title',
  subtitle: 'Subtitle',
};

export const EmptyTitle = Template.bind({});
EmptyTitle.args = {
  onBackButtonClick: () => alert('onBackButtonClick'),
  right: (
    <Button variant="ghost">
      <MoreIcon />
    </Button>
  ),
};

export const WithoutBackButton = Template.bind({});
WithoutBackButton.args = {
  title: 'Filter by',
  right: (
    <Button variant="ghost">
      <MoreIcon />
    </Button>
  ),
};
