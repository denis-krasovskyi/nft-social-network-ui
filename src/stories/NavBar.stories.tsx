import React from 'react';
import { Meta, Story } from '@storybook/react';

import { NavBar, NavBarProps } from 'components/NavBar';
import { ReactComponent as IconFeed } from 'assets/icons/icon-logo.svg';
import { ReactComponent as IconSaved } from 'assets/icons/icon-heart_outline.svg';
import { ReactComponent as IconSavedActive } from 'assets/icons/icon-heart_filled.svg';
import { ReactComponent as IconAccount } from 'assets/icons/icon-user_outline.svg';
import { ReactComponent as IconAccountActive } from 'assets/icons/icon-user_filled.svg';

export default {
  title: 'features/NavBar',
  component: NavBar,
  decorators: [
    (story) => (
      <div
        style={{
          maxWidth: '640px',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as Meta;

export const Template: Story<NavBarProps> = (args): JSX.Element => (
  <NavBar {...args} />
);

Template.storyName = 'NavBar';
Template.args = {
  NavBarLinks: [
    {
      name: 'feed',
      text: 'Feed',
      icon: <IconFeed />,
      iconActive: <IconFeed />,
      link: '/cabinet/managers-feed',
    },
    {
      name: 'saved',
      text: 'Saved',
      icon: <IconSaved />,
      iconActive: <IconSavedActive />,
      link: '/cabinet/manage-saved',
    },
    {
      name: 'account',
      text: 'Account',
      icon: <IconAccount />,
      iconActive: <IconAccountActive />,
      link: '/cabinet/account-edit',
    },
  ],
};
