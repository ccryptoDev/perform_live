import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const SideBarRow = props => {
  const { navInfo, activeTab } = props;

  const match = useRouteMatch(navInfo.path);
  const isActive = navInfo.path === '/' ? match.isExact : match;

  return (
    <NavLink to={navInfo.path} key={activeTab}>
      <div className={cn('side-row', { hover: isActive })}>
        <span
          className={cn('side-row__icon', { hover: isActive }, navInfo.label)}
        />
        <span className={cn('sub-title', { hover: isActive })}>
          {navInfo.label}
        </span>
      </div>
    </NavLink>
  );
};

SideBarRow.propTypes = {
  //  defaultState: PropTypes.any,
  navInfo: PropTypes.object,
  activeTab: PropTypes.string,
};

const SideBarBlock = props => {
  const { className, title, subTitles, activeTab } = props;
  const accessToken = useSelector(state => state.global.userInfo.accessToken);
  return (
    <div className={['side-block', className].join(' ')}>
      {title && <span className="title">{title}</span>}
      {subTitles.map(
        (row, index) =>
          !accessToken && row.isPrivate ? null : (
            <SideBarRow key={index} navInfo={row} activeTab={activeTab} />
          ),
      )}
    </div>
  );
};

SideBarBlock.propTypes = {
  //  defaultState: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string,
  subTitles: PropTypes.array,
  activeTab: PropTypes.string,
};

export default SideBarBlock;
