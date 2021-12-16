import { Components } from '@mui/material/styles';

export const MUI_SWITCH_COMPONENTS_OVERRIDES: Components['MuiSwitch'] = {
  styleOverrides: {
    switchBase: {
      color: 'var(--color-grey-300)',

      '&:hover': {
        backgroundColor: 'var(--color-brown)',
      },

      '&.Mui-checked': {
        color: 'var(--color-orange-peel)',

        '&.Mui-disabled': {
          color: 'var(--color-amber)',
        },

        '&+.MuiSwitch-track': {
          backgroundColor: 'var(--color-amber)',
          opacity: 1,
        },

        '&:hover': {
          backgroundColor: 'var(--color-brown)',
        },
      },

      '&.Mui-disabled': {
        color: 'var(--color-grey-200)',

        '&+.MuiSwitch-track': {
          opacity: 0.5,
        },
      },
    },
    track: {
      backgroundColor: 'var(--color-grey-400)',
      opacity: 1,
    },
    thumb: {
      boxShadow: 'none',
    },
  },
};
