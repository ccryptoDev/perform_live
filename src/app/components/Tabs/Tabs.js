import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Tabs.scss';

export const Tabs = ({ activeTab, onTabClick, tabs }) => (
  <div className="tabs">
    {tabs.map((tab, index) => {
      return (
        <button
          key={tab.name}
          type="button"
          className={cn('tab', { active: index === activeTab })}
          onClick={() => onTabClick(index)}
        >
          <span>{tab.number}</span> {tab.name}
        </button>
      );
    })}
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  activeTab: PropTypes.number,
};

export default Tabs;
