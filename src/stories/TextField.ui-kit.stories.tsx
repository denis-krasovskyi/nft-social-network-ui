import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReactComponent as KeyboardArrowIcon } from 'assets/icons/icon-keyboard_arrow_right.svg';

import Typography from 'components/ui-kit/Typography';
import TextField from 'components/ui-kit/TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = () => {
  const [value, setValue] = React.useState('simple text');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        background: 'var(--color-grey-100)',
        minHeight: '550px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 20px',
      }}
    >
      <TextField
        label="Size small"
        margin="dense"
        size="small"
        placeholder="Add some text"
      />

      <TextField label="Size medium" margin="dense" />

      <TextField label="Size large" margin="dense" size="large" />

      <TextField
        value={value}
        onChange={handleChange}
        label="Controlled input"
        margin="dense"
      />

      <TextField
        label="With icon"
        margin="dense"
        InputProps={{
          endAdornment: <KeyboardArrowIcon />,
        }}
      />

      <TextField
        defaultValue="This is invalid"
        label="Invalid input"
        error
        margin="dense"
      />

      <TextField
        placeholder="Add anything"
        label="Input with helper"
        helperText={
          <Typography variant="subtitle4" component="span">
            Some important helper text
          </Typography>
        }
        margin="dense"
      />

      <TextField
        defaultValue="This is invalid"
        label="Invalid input with message"
        error
        helperText="Incorrect entry."
        margin="dense"
      />
    </div>
  );
};

export const Basic = Template.bind({});
