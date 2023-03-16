/**
 *
 * SideBar
 *
 */

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppConstants from 'app/app.constants.json';

import SideBarBlock from './SideBarBlock';
import './sidebar.scss';
import { routeMap } from '../../app.routes';
import YourEarnings from './components/YourEarnings';
import Button from '../Common/Button';
import plToast from '../../utils/toast';
import ContactModal from '../ContactModal';

// import PropTypes from 'prop-types';

const browseSubTitles = [
  { label: 'home', path: '/' },
  { label: 'favorites', path: '/favorites', isPrivate: true },
  { label: 'settings', path: '/settings' },
  // { label: 'live', path: '/live' },
  // { label: 'upcoming', path: '/upcoming' },
  // { label: 'popular', path: '/popular' },
  // { label: 'channels', path: '/channels' },
];

const accountSubTitles = [
  { label: 'products', path: '/products' },
  { label: 'sales', path: '/sales' },
  { label: 'my profile', path: '/myprofile' },
  { label: 'shipping from', path: '/shipping-from' },
  { label: 'payout account', path: '/payout-account' },
  { label: 'my earnings', path: '/myearnings' },
  { label: 'analytics', path: '/analytics' },
  { label: 'my performances', path: '/my-performances' },
];

const shopSubTitles = [
  { label: 'purchase', path: '/purchase' },
  { label: 'payment & shipping', path: '/payment-shipping' },
];

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const accessToken = useSelector(state => state.global.userInfo.accessToken);
  const performerId = useSelector(state => state.global.userInfo.id);
  const history = useHistory();
  const location = useLocation();

  const goToCreatePerformance = () => {
    if (accessToken) {
      if (performerId) {
        history.push('/performancescheduler?type=sale');
      } else {
        plToast.error(AppConstants.GLOBAL_ERRORS.MESSAGE.ERROR_NOT_PERFORMER);
      }
    } else {
      history.push('/login');
    }
  };

  const currentRoute = location.pathname;
  useEffect(
    () => {
      const routeConfig = routeMap.find(route => {
        // check if current route contains the
        if (route.routeMatch) {
          return currentRoute.indexOf(route.routeMatch) !== -1;
        }
        return route.path === currentRoute;
      });
      setShowSideBar(routeConfig.sidebar);
    },
    [location],
  );

  return (
    <>
      {showSideBar && (
        <div className="home-side-bar">
          <div className="side-bar-wrapper">
            <div className="side-bar-body">
              <SideBarBlock
                title="BROWSE"
                subTitles={browseSubTitles}
                activeTab={currentRoute}
              />
              <SideBarBlock
                title="SHOPPER ACCOUNT"
                subTitles={shopSubTitles}
                activeTab={currentRoute}
              />
              <SideBarBlock
                title="MY ACCOUNT"
                subTitles={accountSubTitles}
                activeTab={currentRoute}
              />
            </div>
            <div className="side-bar-bottom">
              {/* {!accessToken && (
                <div className="earn-moeny">Start performing to earn money</div>
              )} */}
              <Button size="large" onClick={goToCreatePerformance}>
                NEW PERFORMANCE
              </Button>

              {accessToken && <YourEarnings />}
            </div>
          </div>
        </div>
      )}
      {
        <ContactModal
          isShowModal={isContactModalOpen}
          heading="Contact Us"
          confirmCallBack={show => setIsContactModalOpen(show)}
          cancelCallBack={() => {
            setIsContactModalOpen(false);
          }}
        />
      }
    </>
  );
};

SideBar.propTypes = {};

export default SideBar;
