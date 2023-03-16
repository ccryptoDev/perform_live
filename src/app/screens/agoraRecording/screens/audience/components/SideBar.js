import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainSideBarView from './sidebar/MainSidebarView';

import { useSelector } from 'react-redux';

const SideBar = ({ isExpand }) => {
  const [currentSidebarView, setCurrentSidebarView] = useState('main');
  const reduxState = useSelector(state => state);
  const [performanceProducts, setPerformanceProducts] = React.useState([]);
  const [focusedProducts, setFocusedProducts] = React.useState([]);

  useEffect(
    () => {
      if (reduxState.productmanagement) {
        setPerformanceProducts(
          reduxState.productmanagement.performanceProducts,
        );
      }
    },
    [reduxState.productmanagement],
  );
  const steps = {
    main: (
      <MainSideBarView
        isExpand={isExpand}
        setFocusedProducts={setFocusedProducts}
        focusedProducts={focusedProducts}
      />
    ),
  };
  return (
    <>
      <div className={isExpand ? 'side-bar active' : 'side-bar'}>
        {steps[currentSidebarView]}{' '}
      </div>
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
