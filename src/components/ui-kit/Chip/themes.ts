import { Components } from '@mui/material/styles';

export const MUI_CHIP_COMPONENTS_OVERRIDES: Components['MuiChip'] = {
  styleOverrides: {
    root: {
      height: 'auto',
    },
    icon: {
      marginLeft: '15px',
      marginRight: '-6px',
      color: 'var(--color-orange-peel)',
    },
    label: {
      '&::selection': {
        backgroundColor: 'var(--color-grey-300)',
      },
    },
    clickable: {
      cursor: 'pointer',
    },
  },
  defaultProps: {
    color: 'primary',
  },
};
