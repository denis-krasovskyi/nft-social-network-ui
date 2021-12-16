import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from 'store';
import { SnackbarProvider } from 'components/ui-kit/Snackbar';
import Routes from 'containers/screens/routes';
import MuiConfig from 'containers/layouts/MuiConfig';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <MuiConfig>
          <SnackbarProvider>
            <Routes />
          </SnackbarProvider>
        </MuiConfig>
      </HashRouter>
    </Provider>
  );
};

export default App;
