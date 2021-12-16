import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormGroup, FormControlLabel } from 'components/ui-kit/formUtils';
import Checkbox from 'components/ui-kit/Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
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
          control={<Checkbox defaultChecked {...args} />}
          label="Label"
        />
      </FormGroup>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  disabled: false,
  indeterminate: false,
};
