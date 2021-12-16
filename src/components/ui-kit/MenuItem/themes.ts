import { Components } from '@mui/material/styles';

export const MUI_MENU_ITEM_COMPONENTS_OVERRIDES: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      padding: 0,

      '&:hover': {
        backgroundColor: 'var(--color-grey-200)',
      },

      '&+.MuiDivider-root': {
        marginTop: '12px',
        marginBottom: '12px',
      },
    },
  },
};
