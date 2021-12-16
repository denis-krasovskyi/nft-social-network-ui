import { Components } from '@mui/material/styles';

export const MUI_TABS_COMPONENTS_OVERRIDES: {
  MuiTab: Components['MuiTab'];
  MuiTabs: Components['MuiTabs'];
} = {
  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: 'var(--fontPrimary)',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '24px',
        minHeight: '40px',
        padding: '8px 16px',
        color: 'var(--color-grey-500)',

        '&.Mui-selected': {
          color: 'var(--color-coal-black)',
        },
      },
    },
  },
  MuiTabs: {
    defaultProps: {
      variant: 'fullWidth',
      scrollButtons: false,
    },
    styleOverrides: {
      root: {
        minHeight: '40px',
      },
      indicator: {
        backgroundColor: 'var(--color-orange-peel)',
      },
      flexContainer: {
        position: 'relative',

        '&::before': {
          content: '""',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: 'var(--color-grey-200)',
        },
      },
    },
  },
};
