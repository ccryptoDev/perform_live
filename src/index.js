import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import config from 'app/config/index.config';
import configureStore from './store';
import App from './app';

import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
import 'sanitize.css/sanitize.css';
import 'app/styles/global.scss';
import hotjar from './app/utils/hotjar';

const { STRIPE_KEY } = config;

if (config.HOTJAR) {
  hotjar.initialize(config.HOTJAR.HOTJAR_ID, config.HOTJAR.HOTJAR_SV);
}

if (!config.DEBUG_MODE) {
  /* eslint-disable no-global-assign, func-names */
  console = console || {};
  console.log = function() {};
  console.error = function() {};
  console.debug = function() {};
}

const MOUNT_NODE = document.getElementById('app');
export const history = createBrowserHistory();

const initialState = {};
const { store, persistor } = configureStore(initialState, history);

const stripePromise = loadStripe(STRIPE_KEY);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App history={history} />
        </Elements>
      </PersistGate>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const OfflinePlugin = require('offline-plugin/runtime');

  OfflinePlugin.install({
    onUpdateReady() {
      console.log('Applying SW Update');
      OfflinePlugin.applyUpdate();
    },

    onUpdated() {
      console.log('SW Updated');
      window.location.reload();
    },
  }); // eslint-disable-line global-require
}
