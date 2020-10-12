import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// import { AppContainer } from 'react-hot-loader'; //  react-hot-loader (dev server, hot module replacement)
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const Index = () => {
  return (
    <React.StrictMode>
      <HashRouter>
        {/* <AppContainer> */}
        <App />
        {/* </AppContainer> */}
      </HashRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(Index(), document.getElementById('root'));

// hot module replacement
if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(null, document.getElementById('root'));
    ReactDOM.render(Index(), document.getElementById('root'));
  });
}
