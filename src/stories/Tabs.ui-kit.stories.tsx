import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tabs, { TabPanel, Tab, tabA11yProps } from 'components/ui-kit/Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ maxWidth: '300px', background: 'var(--color-grey-100)' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        {...args}
      >
        <Tab label="Vacancies" {...tabA11yProps(0)} />
        <Tab label="Offers" {...tabA11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};

export const Basic = Template.bind({});
