import { Components } from '@mui/material/styles';

export const MUI_INPUT_LABEL_COMPONENTS_OVERRIDES: Components['MuiInputLabel'] =
  {
    styleOverrides: {
      root: {
        color: 'var(--color-grey-500)',

        '&.Mui-focused': {
          color: 'var(--color-grey-500)',
        },
      },
    },
  };
