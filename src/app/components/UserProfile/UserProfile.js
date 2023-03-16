import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import Button from '../Common/Button';

export class UserProfile extends React.PureComponent {
  state = {
    isBtnActive: false,
  };

  toggleBtn = () => {
    this.setState(
      prevState => ({
        isBtnActive: !prevState.isBtnActive,
      }),
      () => {
        if (this.state.isBtnActive) {
          document.addEventListener(
            'mousedown',
            this.handleOutsideClick,
            false,
          );
        } else {
          document.removeEventListener(
            'mousedown',
            this.handleOutsideClick,
            false,
          );
        }
      },
    );
  };

  handleOutsideClick = e => {
    if (this.profileDDNode && !this.profileDDNode.contains(e.target)) {
      this.setState({
        isBtnActive: false,
      });
    }
  };

  onRefreshMaster = () => {
    this.setState({
      isBtnActive: false,
    });
    this.props.onRefreshMaster();
  };

  onLogout = () => {
    this.setState({
      isBtnActive: false,
    });
    this.props.onLogout();
  };

  render() {
    const { customClass, name, profileImage } = this.props;
    return (
      <div className="profile-container">
        <div
          className={`profile-btn-container ${
            this.state.isBtnActive ? 'active' : ''
          } ${customClass}`}
          onClick={this.toggleBtn}
          role="presentation"
        >
          <span className="profile-name">{name}</span>
          <Button background="transparent" className="profile-button">
            <img src={profileImage} />
          </Button>
        </div>
        {this.state.isBtnActive && (
          <div
            className="btn-dd-container"
            ref={elem => {
              this.profileDDNode = elem;
            }}
          >
            <div
              className="dd-item"
              onClick={this.onLogout}
              role="presentation"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  customClass: PropTypes.string,
  profileImage: PropTypes.string,
  name: PropTypes.string,
  onRefreshMaster: PropTypes.func,
  onLogout: PropTypes.func,
};

export default UserProfile;
