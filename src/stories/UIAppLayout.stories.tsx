import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UIAppLayout from 'containers/layouts/UIAppLayout';
import CandidateCard from 'components/CandidateCard';

export default {
  title: 'features/UIAppLayout',
  component: UIAppLayout,
  decorators: [
    (story) => (
      <div
        style={{
          height: '100%',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof UIAppLayout>;

export const Template: ComponentStory<typeof UIAppLayout> = (args) => (
  <UIAppLayout {...args} />
);

Template.storyName = 'UIAppLayout';
Template.args = {
  children: (
    <CandidateCard
      fullName="Jenny Wilson"
      jobPosition="Sous chef"
      avatarLink="123"
      isAvailable
      isLiked
      workRights="Australian Citizen"
      specialties={[
        'fine dining',
        'asian',
        'menu planning',
        'western food',
        'asian menu planning',
      ]}
      videoResumeLink="https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4"
    />
  ),
};
