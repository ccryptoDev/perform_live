import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleSideDrawer } from 'app/state/app.actions';
import IMG from 'app/utils/images';
import './SideDrawer.scss';

export class SideDrawer extends PureComponent {
  renderMenuItems() {
    return this.props.menuItems
      .filter(menuItem => menuItem.sidebar)
      .map(menuItem => {
        const { name, icon, path } = menuItem;
        return (
          <NavLink to={path} activeClassName="active" key={name}>
            <li>{name}</li>
            <span>
              <img src={icon} alt={name} className={name} />
            </span>
          </NavLink>
        );
      });
  }

  render() {
    const drawerClasses = this.props.isSideDrawerOpen
      ? 'side-drawer open'
      : 'side-drawer';

    const toggleIcon = !this.props.isSideDrawerOpen ? (
      <img src={IMG.IC_HAMBURGER_ICON} alt="hamburger-icon" />
    ) : (
      <span>&times;</span>
    );

    return (
      <nav className={drawerClasses}>
        <div className="toggle-btn-container">
          <button
            type="button"
            className="toggle-btn"
            onClick={this.props.toggleSideDrawer}
          >
            {toggleIcon}
          </button>
        </div>
        <ul>{this.renderMenuItems()}</ul>
      </nav>
    );
  }
}

SideDrawer.propTypes = {
  isSideDrawerOpen: PropTypes.bool,
  toggleSideDrawer: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleSideDrawer: () => dispatch(toggleSideDrawer()),
});

const mapStateToProps = state => ({
  isSideDrawerOpen: state.global.isSideDrawerOpen,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideDrawer);
