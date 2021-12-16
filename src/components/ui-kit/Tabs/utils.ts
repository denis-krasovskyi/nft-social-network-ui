export const tabA11yProps = (
  index: string | number,
): { id: string; role: 'tab'; 'aria-controls': string } => {
  return {
    role: 'tab',
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export const tabPanelA11yProps = (
  index: string | number,
): { id: string; role: 'tabpanel'; 'aria-labelledby': string } => {
  return {
    role: 'tabpanel',
    id: `tabpanel-${index}`,
    'aria-labelledby': `tab-${index}`,
  };
};
