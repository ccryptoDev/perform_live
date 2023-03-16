import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleSideDrawer } from 'app/state/app.actions';

export const withSidebarStateCheck = () => WrappedComponent => {
  class HOC extends PureComponent {
    componentDidMount() {
      if (this.props.isSideDrawerOpen) {
        this.props.toggleSideDrawer();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  HOC.propTypes = {
    toggleSideDrawer: PropTypes.func,
    isSideDrawerOpen: PropTypes.bool,
  };

  const mapStateToProps = state => ({
    isSideDrawerOpen: state.global.isSideDrawerOpen,
  });

  const mapDispatchToProps = dispatch => ({
    toggleSideDrawer: () => dispatch(toggleSideDrawer()),
  });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return withConnect(HOC);
};
