import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import _forEach from 'lodash/forEach';
// import MomentUtils from '@date-io/moment';
import ErrorBoundary from './components/ErrorBoundary';

import Loader from './components/Loader';
import Footer from './components/Footer/index';
import { getHOCWrappedComponent } from './utils/component';
import config from './config/index.config';
import { routeMap } from './app.routes';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { PerformanceCategoriesModal } from './screens/performanceScheduler/components/PerformanceCategoriesModal/PerformanceCategoriesModal';

const allowedScreens = [
  'Home',
  'Privacy',
  'UserAgreement',
  'AgoraRecording',
  'Faq',
  'ConfirmPassword',
  'Verification'
];

const getRouteComponents = (routes, accessToken) => {
  const routeComponents = [];
  _forEach(routes, route => {
    if (
      !accessToken ||
      (accessToken && (route.isPrivate || allowedScreens.includes(route.name)))
    ) {
      routeComponents.push(
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={
            allowedScreens.includes(route.name)
              ? route.screen
              : getHOCWrappedComponent(route.screen, route)
          }
          // component={route.screen}
        />,
      );
    }
  });

  return routeComponents;
};

export class Routes extends React.PureComponent {
  // check if current path is allowed to use user side panel
  render() {
    const { accessToken, showPlanModal, homeSideBar, history } = this.props;
    const lazyRoutesMap = (
      // <MuiThemeProvider theme={this.theme}>
      //   <MuiPickersUtilsProvider utils={MomentUtils}>
      <Suspense fallback={<Loader />}>
        <Switch>
          {getRouteComponents(routeMap, accessToken)}
          <Redirect to={config.PUBLIC_ROOT} /> {/* Redirect if 404 */}
          {/* <Route component={NoMatch} /> IF 404 to be displayed separately */}
        </Switch>
      </Suspense>
      //   </MuiPickersUtilsProvider>
      // </MuiThemeProvider>
    );

    return (
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          {accessToken && (
            <div className="layout-container">
              <main className="page-container">
                <Header accessToken={accessToken} />
                <div className="body-container">
                  {homeSideBar && <SideBar routeMap={routeMap} />}
                  {lazyRoutesMap}
                </div>
                <Footer />
              </main>
              {showPlanModal && <PerformanceCategoriesModal />}
            </div>
          )}
          {!accessToken && (
            <div className="layout-container">
              <main className="auth-container">
                <Header accessToken={accessToken} />
                <div className="body-container">
                  {homeSideBar && <SideBar />}
                  {lazyRoutesMap}
                </div>
                <Footer />
              </main>
            </div>
          )}
        </ErrorBoundary>
      </ConnectedRouter>
    );
  }
}

Routes.propTypes = {
  accessToken: PropTypes.string,
  showPlanModal: PropTypes.bool,
};

const mapStateToProps = state => ({
  accessToken: state.global.userInfo.accessToken,
  showPlanModal: state.global.showPlanModal,
  homeSideBar: state.global.homeSideBar,
});

export default connect(mapStateToProps)(Routes);
