import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import IMG from 'app/utils/images';
import { logoutUser } from 'app/state/app.actions';
// import ToggleSearch from '../ToggleSearch';
import UserProfile from '../UserProfile';
import './PageHeader.scss';

export class PageHeader extends React.PureComponent {
  render() {
    const { isSideDrawerOpen, userName } = this.props;
    return (
      <header className="header">
        <div
          className={
            isSideDrawerOpen ? 'logo-container slide' : 'logo-container'
          }
        >
          <img src={IMG.LOGO} alt="App Logo" className="logo" />
          {/* // performlive APP */}
        </div>

        <div className="right-container">
          <UserProfile
            customClass="user-profile"
            profileImage={IMG.USER}
            name={userName}
            onLogout={this.props.logoutUser}
          />
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  isSideDrawerOpen: PropTypes.bool,
  userName: PropTypes.string,
  logoutUser: PropTypes.func,
};

const mapStateToProps = state => ({
  isSideDrawerOpen: state.global.isSideDrawerOpen,
  userName: state.global.userInfo.userName,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PageHeader);
