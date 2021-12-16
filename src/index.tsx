import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

import './styles/index.scss';

const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

declare let window: Window & {
  cordova: unknown;
};

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
