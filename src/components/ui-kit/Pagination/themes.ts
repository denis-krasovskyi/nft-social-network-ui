import { Components } from '@mui/material/styles';

export const MUI_PAGINATION_COMPONENTS_OVERRIDES: Components['MuiPagination'] =
  {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',

        ul: {
          'li:first-child button': {
            marginRight: '20px',

            '&::after': {
              content: '"Prev"',
              marginLeft: '10px',
            },
          },

          'li:last-child button': {
            marginLeft: '20px',

            '&::before': {
              content: '"Next"',
              marginRight: '10px',
            },
          },
        },
      },
    },
  };

export const MUI_PAGINATION_ITEM_COMPONENTS_OVERRIDES: Components['MuiPaginationItem'] =
  {
    styleOverrides: {
      root: {
        borderRadius: '4px',
        color: 'var(--color-coal-black)',
        fontFamily: 'var(--fontSecondary)',
        fontWeight: 400,
        margin: 0,
        padding: 0,

        '&:hover': {
          backgroundColor: 'var(--color-grey-100)',
        },

        '&.MuiPaginationItem-ellipsis': {
          color: 'var(--color-grey-400)',

          '&:hover': {
            backgroundColor: 'transparent',
          },
        },

        '&.MuiPaginationItem-previousNext': {
          color: 'var(--color-orange-peel)',
          fontSize: '12px',
          fontWeight: 600,
          minWidth: '56px',

          '&:hover': {
            backgroundColor: 'transparent',
          },

          '&.Mui-disabled': {
            color: 'var(--color-grey-300)',
            opacity: 1,
          },
        },

        '&.Mui-selected': {
          backgroundColor: 'var(--color-grey-200)',
          cursor: 'default',
          pointerEvents: 'none',

          '&:hover': {
            backgroundColor: 'var(--color-grey-200)',
          },
        },
      },
    },
  };
