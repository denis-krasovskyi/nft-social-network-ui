import { Components } from '@mui/material/styles';

export const MUI_CHECKBOX_COMPONENTS_OVERRIDES: Components['MuiCheckbox'] = {
  styleOverrides: {
    root: {
      color: 'var(--color-grey-400)',

      '&:hover': {
        backgroundColor: 'var(--color-brown)',
      },

      '&.Mui-checked': {
        color: 'var(--color-orange-peel)',
      },

      '&.MuiCheckbox-indeterminate': {
        color: 'var(--color-orange-peel)',
      },

      '&.Mui-disabled': {
        color: 'var(--color-orange-peel)',
      },
    },
  },
};
