import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from 'components/ui-kit/Button';

import { ReactComponent as KeyboardArrowIcon } from 'assets/icons/icon-keyboard_arrow_right.svg';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Heading',
  variant: 'primary',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Heading',
  variant: 'secondary',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;

export const Tertiary = Template.bind({});
Tertiary.decorators = [
  (Story) => (
    <div
      style={{
        minWidth: '200px',
        minHeight: '200px',
        background: 'white',
        padding: '20px',
      }}
    >
      <Story />
    </div>
  ),
];
Tertiary.args = {
  children: 'Heading',
  variant: 'tertiary',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Heading',
  variant: 'ghost',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;

export const PrimaryError = Template.bind({});
PrimaryError.args = {
  children: 'Heading',
  variant: 'primaryError',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;

export const TertiaryError = Template.bind({});
TertiaryError.args = {
  children: 'Heading',
  variant: 'tertiaryError',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;
TertiaryError.decorators = Tertiary.decorators;

export const GhostError = Template.bind({});
GhostError.args = {
  children: 'Heading',
  variant: 'ghostError',
  startIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  endIcon: <KeyboardArrowIcon style={{ transform: 'rotate(180deg)' }} />,
  style: { minWidth: '170px' },
} as React.ComponentProps<typeof Button>;
GhostError.decorators = TertiaryError.decorators;

export const IconOnly = Template.bind({});
IconOnly.args = {
  children: <KeyboardArrowIcon />,
  variant: 'primary',
} as React.ComponentProps<typeof Button>;
