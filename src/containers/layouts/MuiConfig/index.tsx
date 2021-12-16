import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { lightMuiTheme } from './themes';

const MuiConfig: React.FC = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={lightMuiTheme}>{children}</ThemeProvider>
  </StyledEngineProvider>
);

export default MuiConfig;
