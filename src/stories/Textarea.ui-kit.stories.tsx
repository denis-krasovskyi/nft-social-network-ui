import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography from 'components/ui-kit/Typography';
import Textarea from 'components/ui-kit/TextField';

export default {
  title: 'Components/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = () => {
  return (
    <div
      style={{
        maxWidth: '700px',
        background: 'var(--color-grey-100)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0 20px',
      }}
    >
      <Textarea
        label="This is a label"
        multiline
        margin="dense"
        rows={2}
        placeholder="This is a placeholder"
      />

      <Textarea
        label="Multiline"
        multiline
        margin="dense"
        rows={4}
        defaultValue="This is a Default Value"
      />

      <Textarea
        label="Multiline invalid"
        multiline
        margin="dense"
        rows={4}
        error
        defaultValue="Invalid Value"
      />

      <Textarea
        label="Valid length input"
        defaultValue="This is valid"
        margin="dense"
        multiline
        rows={4}
        helperText={
          <Typography variant="subtitle4" component="span">
            123
          </Typography>
        }
      />

      <Textarea
        label="Invalid length input"
        defaultValue="This is invalid"
        margin="dense"
        multiline
        rows={4}
      />
    </div>
  );
};

export const Basic = Template.bind({});
