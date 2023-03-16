import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'app/config/index.config';
import AppConstants from 'app/app.constants.json';

export const withAuthCheck = (isPrivate = false) => WrappedComponent => {
  class HOC extends PureComponent {
    componentDidMount() {
      setTimeout(() => {
        if (
          (!this.props.accessToken ||
            this.props.accessToken === AppConstants.INVALID ||
            this.props.accessToken === AppConstants.E403) &&
          isPrivate
        ) {
          // If Access Token doesn't exist or isn't valid and the route being accessed is a private route, redirect to public one
          this.props.history.push(config.PUBLIC_ROOT_LOGIN);
        } else if (
          this.props.accessToken &&
          this.props.accessToken !== AppConstants.INVALID &&
          this.props.accessToken !== AppConstants.E403 &&
          !isPrivate
        ) {
          // If Access Token exists & is valid and the route being accessed is a public route (auth module), redirect to private one (home)
          this.props.history.push(config.PRIVATE_ROOT);
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  HOC.propTypes = {
    accessToken: PropTypes.string,
    history: PropTypes.object,
  };

  const mapStateToProps = state => ({
    accessToken: state.global.userInfo.accessToken,
  });

  const withConnect = connect(
    mapStateToProps,
    null,
  );

  return withConnect(HOC);
};
