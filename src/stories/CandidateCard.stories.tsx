import React from 'react';
import { Meta, Story } from '@storybook/react';

import CandidateCard from 'components/CandidateCard';

export default {
  title: 'features/CandidateCard',
  component: CandidateCard,
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '440px',
          paddingBottom: '20px',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as Meta;

export const Template: Story<React.ComponentProps<typeof CandidateCard>> = (
  args,
): JSX.Element => <CandidateCard {...args} />;

Template.storyName = 'CandidateCard';
Template.args = {
  fullName: 'Jenny Wilson',
  jobPosition: 'Sous chef',
  avatarLink: '123',
  isAvailable: true,
  isLiked: true,
  workRights: 'Australian Citizen',
  specialties: [
    'fine dining',
    'asian',
    'menu planning',
    'western food',
    'asian menu planning',
  ],
  videoResumeLink:
    'https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4',
};
