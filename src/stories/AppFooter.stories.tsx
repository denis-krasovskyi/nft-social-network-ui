import React from 'react';
import { Meta, Story } from '@storybook/react';

import { AppFooter, AppFooterProps } from 'components/AppFooter';
import { ReactComponent as IconSocialTwitter } from '../assets/icons/icon-social-twitter.svg';
import { ReactComponent as IconSocialFacebook } from '../assets/icons/icon-social-facebook.svg';
import { ReactComponent as IconSocialInstagram } from '../assets/icons/icon-social-instagram.svg';

export default {
  title: 'features/AppFooter',
  component: AppFooter,
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

export const Template: Story<AppFooterProps> = (args): JSX.Element => (
  <AppFooter {...args} />
);

Template.storyName = 'AppFooter';
Template.args = {
  socialMediaList: [
    { icon: <IconSocialTwitter />, href: 'https://twitter.com/' },
    { icon: <IconSocialFacebook />, href: 'https://facebook.com/' },
    { icon: <IconSocialInstagram />, href: 'https://instagram.com/' },
  ],
};
