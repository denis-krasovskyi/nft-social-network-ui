import { Components } from '@mui/material/styles';

export const MUI_AVATAR_COMPONENTS_OVERRIDES: Components['MuiAvatar'] = {
  styleOverrides: {
    root: {
      background: 'transparent',
      color: 'var(--color-orange-peel)',
    },
  },
};
