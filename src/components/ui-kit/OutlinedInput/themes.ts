import { Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const MUI_INPUT_OUTLINED_COMPONENTS_OVERRIDES: Components['MuiOutlinedInput'] =
  {
    styleOverrides: {
      root: {
        borderRadius: '8px',

        '&:hover': {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color-orange-peel)',
          },
        },

        '&.Mui-focused': {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color-orange-peel)',
          },
        },

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: 'var(--color-grey-300)',
        },
      },
      input: {
        color: 'var(--color-coal-black)',
      },
    },
  };
