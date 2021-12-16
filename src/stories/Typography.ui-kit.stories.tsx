import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography from 'components/ui-kit/Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Heading1 = Template.bind({});
Heading1.args = {
  children: 'Heading / 1',
  variant: 'h1',
} as React.ComponentProps<typeof Typography>;

export const Heading2 = Template.bind({});
Heading2.args = {
  children: 'Heading / 2',
  variant: 'h2',
} as React.ComponentProps<typeof Typography>;

export const Heading3 = Template.bind({});
Heading3.args = {
  children: 'Heading / 3',
  variant: 'h3',
} as React.ComponentProps<typeof Typography>;

export const Heading4 = Template.bind({});
Heading4.args = {
  children: 'Heading / 4',
  variant: 'h4',
} as React.ComponentProps<typeof Typography>;

export const Title1 = Template.bind({});
Title1.args = {
  children: 'Title / 1',
  variant: 'title1',
} as React.ComponentProps<typeof Typography>;

export const Title2 = Template.bind({});
Title2.args = {
  children: 'Title / 2',
  variant: 'title2',
} as React.ComponentProps<typeof Typography>;

export const Title3 = Template.bind({});
Title3.args = {
  children: 'Title / 3',
  variant: 'title3',
} as React.ComponentProps<typeof Typography>;

export const Title4 = Template.bind({});
Title4.args = {
  children: 'Title / 4',
  variant: 'title4',
} as React.ComponentProps<typeof Typography>;

export const SubTitle1 = Template.bind({});
SubTitle1.args = {
  children: 'Subtitle / 1',
  variant: 'subtitle1',
} as React.ComponentProps<typeof Typography>;

export const SubTitle2 = Template.bind({});
SubTitle2.args = {
  children: 'Subtitle / 2',
  variant: 'subtitle2',
} as React.ComponentProps<typeof Typography>;

export const SubTitle3 = Template.bind({});
SubTitle3.args = {
  children: 'Subtitle / 3',
  variant: 'subtitle3',
} as React.ComponentProps<typeof Typography>;

export const SubTitle4 = Template.bind({});
SubTitle4.args = {
  children: 'Subtitle / 4',
  variant: 'subtitle4',
} as React.ComponentProps<typeof Typography>;

export const Paragraph1 = Template.bind({});
Paragraph1.args = {
  children: 'Paragraph / 1',
  variant: 'paragraph1',
} as React.ComponentProps<typeof Typography>;

export const Body1 = Template.bind({});
Body1.args = {
  children: 'Body / 1',
  variant: 'body1',
} as React.ComponentProps<typeof Typography>;

export const Body2 = Template.bind({});
Body2.args = {
  children: 'Body / 2',
  variant: 'body2',
} as React.ComponentProps<typeof Typography>;

export const Body2Bold = Template.bind({});
Body2Bold.args = {
  children: 'Body / 2 / Bold',
  variant: 'body3',
} as React.ComponentProps<typeof Typography>;

export const Caption1 = Template.bind({});
Caption1.args = {
  children: 'Caption / 1',
  variant: 'caption',
} as React.ComponentProps<typeof Typography>;

export const Caption2 = Template.bind({});
Caption2.args = {
  children: 'Caption / 2',
  variant: 'caption2',
} as React.ComponentProps<typeof Typography>;

export const Button1 = Template.bind({});
Button1.args = {
  children: 'Button / 1',
  variant: 'button',
} as React.ComponentProps<typeof Typography>;

export const Button2 = Template.bind({});
Button2.args = {
  children: 'Button / 2',
  variant: 'button2',
} as React.ComponentProps<typeof Typography>;

export const Button3 = Template.bind({});
Button3.args = {
  children: 'Button / 3',
  variant: 'button3',
} as React.ComponentProps<typeof Typography>;

export const Label1 = Template.bind({});
Label1.args = {
  children: 'Label / 1',
  variant: 'label1',
} as React.ComponentProps<typeof Typography>;

export const Link1 = Template.bind({});
Link1.args = {
  children: 'Link / 1',
  variant: 'link1',
} as React.ComponentProps<typeof Typography>;

export const Link2 = Template.bind({});
Link2.args = {
  children: 'Link / 2',
  variant: 'link2',
} as React.ComponentProps<typeof Typography>;

export const Additional1 = Template.bind({});
Additional1.args = {
  children: 'Additional / 1',
  variant: 'additional1',
} as React.ComponentProps<typeof Typography>;
