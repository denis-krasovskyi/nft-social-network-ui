import { Components } from '@mui/material/styles';

export const MUI_DIVIDER_COMPONENTS_OVERRIDES: Components['MuiDivider'] = {
  styleOverrides: {
    root: {
      borderColor: 'var(--color-grey-100)',
    },
  },
};
