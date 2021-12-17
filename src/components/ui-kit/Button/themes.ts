import { Components } from '@mui/material/styles';

export const MUI_BUTTON_COMPONENTS_OVERRIDES: Components['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      borderRadius: '8px',
      padding: '6px 8px',
      color: 'var(--color-coal-black)',

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:disabled': {
        color: 'var(--color-coal-black)',
      },
    },
    textSizeMedium: {
      fontFamily: 'var(--fontPrimary)',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '20px',
    },
    sizeMedium: {
      minHeight: '42px',
      minWidth: '40px',
    },
    textSizeLarge: {
      fontFamily: 'var(--fontPrimary)',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '24px',
    },
    sizeLarge: {
      minHeight: '48px',
      minWidth: '48px',
    },
  },
};
