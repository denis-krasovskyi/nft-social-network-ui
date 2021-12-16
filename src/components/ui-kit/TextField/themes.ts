import { Components } from '@mui/material/styles';

export const MUI_TEXT_FIELD_COMPONENTS_OVERRIDES: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      boxSizing: 'border-box',
      background: 'transparent',
      color: 'var(--color-grey-400)',

      '&:hover': {
        borderColor: 'var(--color-brown)',
      },
    },
  },
  defaultProps: {
    size: 'medium',
  },
};
