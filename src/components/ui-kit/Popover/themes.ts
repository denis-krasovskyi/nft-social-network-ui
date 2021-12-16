import { Components } from '@mui/material/styles';

export const MUI_POPOVER_COMPONENTS_OVERRIDES: Components['MuiPopover'] = {
  styleOverrides: {
    paper: {
      boxShadow: '0px 2px 12px rgba(8, 5, 0, 0.12)',
    },
  },
};
