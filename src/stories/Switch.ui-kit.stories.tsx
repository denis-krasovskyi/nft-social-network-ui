import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormGroup, FormControlLabel } from 'components/ui-kit/formUtils';
import Switch from 'components/ui-kit/Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => {
  return (
    <div
      style={{
        maxWidth: '300px',
        padding: '20px',
        background: 'var(--color-grey-100)',
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked {...args} />}
          label="Label"
        />
      </FormGroup>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  disabled: false,
};
