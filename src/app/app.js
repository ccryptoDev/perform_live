/**
 * app.js
 *
 * This is the global Container/feature.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import _get from 'lodash/get';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Helmet } from 'react-helmet';
import BrowserCheck from './components/BrowserCheck';
import appSaga from './state/app.saga';
import injectSaga from './utils/injectSaga';
import config from './config/index.config';
import Routes from './routesWrapper';
import Loader from './components/Loader';
// import InitGTM from './components/InitGTM';
// import CookiesConsentMessage from './components/CookiesConsentMessage';
import { setCookieConsentStatus } from './state/app.actions';
// import Header from './components/Header';
// import Footer from './components/Footer';
import NotificationsProvider from './components/NotificationsProvider';
import { ApiProvider } from './hooks/api';
// import { ReactQueryDevtools } from 'react-query/devtools';

const { GOOGLE_TAG_MANAGER_ID, PUSH_NOTIFICATIONS_ENABLED } = config || null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export class App extends React.PureComponent {
  onNotificationsReceived(payload) {
    const topicName = _get(payload, 'data.topicName');

    switch (topicName.toUpperCase()) {
      default:
        break;
    }
  }

  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <ApiProvider>
          <QueryClientProvider client={queryClient}>
            {PUSH_NOTIFICATIONS_ENABLED && (
              <NotificationsProvider
                getDeviceToken={this.props.getDeviceToken}
                deviceToken={this.props.deviceToken}
                accessToken={this.props.accessToken}
                // onNotificationsReceived={payload => onNotificationsReceived(payload)}
              >
                <Routes history={history} />
              </NotificationsProvider>
            )}
            {!PUSH_NOTIFICATIONS_ENABLED && <Routes history={history} />}
            <BrowserCheck />
            {/* {this.props.accessToken && (
          <CookiesConsentMessage
            isModalOpen={!this.props.displayCookiesConsent}
            closeModal={() => this.props.setCookieConsentStatus()}
          />
        )} */}
            {/* {GOOGLE_TAG_MANAGER_ID && <InitGTM gtmId={GOOGLE_TAG_MANAGER_ID} />} */}
            {this.props.isLoading && <Loader />}
            <div className="pl-background" />
            <ToastContainer position="top-center" />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </ApiProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  accessToken: PropTypes.string,
  displayCookiesConsent: PropTypes.bool.isRequired,
  setCookieConsentStatus: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  accessToken: state.global.userInfo.accessToken,
  displayCookiesConsent: state.global.displayCookiesConsent,
});

const mapDispatchToProps = dispatch => ({
  setCookieConsentStatus: payload => dispatch(setCookieConsentStatus(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withAppSaga = injectSaga({ key: 'global', saga: appSaga });

export default compose(
  withAppSaga,
  withConnect,
)(App);
