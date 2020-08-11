// import 'react-app-polyfill/ie11';  // 아직까진 ie11 정상이니까, 주석
// import 'react-app-polyfill/stable';
import { AppContainer } from 'react-hot-loader'; //  react-hot-loader (dev server, hot module replacement)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const Index = () => {
  return (
    <React.StrictMode>
      <AppContainer>
        <App />
      </AppContainer>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// hot module replacement
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    console.log('Accepting the updated App module!');

    ReactDOM.render(<></>, document.getElementById('root'));
    ReactDOM.render(<Index />, document.getElementById('root'));
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
