import { Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const MUI_TEXT_FIELD_COMPONENTS_OVERRIDES: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      boxSizing: 'border-box',
      background: 'transparent',
      color: 'var(--color-grey-400)',
      border: 0,

      '&:hover': {
        borderColor: 'var(--color-brown)',
      },
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: 0,
      },
    },
  },
  defaultProps: {
    size: 'medium',
  },
};
