/**
 *
 * Header
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import useOnclickOutside from 'react-cool-onclickoutside';
import { IMG } from '../../screens/profile/profile.dependencies';
import Button from '../Common/Button';
import { checkUrl, useQuery as useLocationQuery } from '../../utils/common';
import ContactModal from '../ContactModal';
import ArrowUp from '../../../assets/svg/arrow-black.svg';
import LogoutIcon from '../../../assets/svg/home/logout.svg';
import { resetAuthState } from '../../state/app.actions';

export const Header = props => {
  const query = useLocationQuery(window.location.search);
  const contact = query.get('contact');
  const [showHeader, setHeader] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const imageUrl = useSelector(state => state.global.userInfo.imageUrl);
  const userName = useSelector(state => state.global.userInfo);
  const [isInfoUser, setIsInfoUser] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.global.userInfo.accessToken);
  const logout = useCallback(() => dispatch(resetAuthState()));

  const ref = useOnclickOutside(() => {
    setIsInfoUser(false);
  });

  useEffect(
    () => {
      if (contact) {
        setIsContactModalOpen(true);
      }
    },
    [contact],
  );

  useEffect(
    () => {
      setIsInfoUser(false);
      const currentRoute = location.pathname;
      if (
        currentRoute === '/privacy' ||
        currentRoute === '/userAgreement' ||
        currentRoute === '/faq' ||
        currentRoute.indexOf('agorarecording') !== -1
      ) {
        setHeader(false);
      } else {
        setHeader(true);
      }
    },
    [location],
  );

  const goToHome = () => {
    history.push('/');
  };

  return (
    <>
      {showHeader && (
        <div className="header">
          <div className="menu">
            {/* <span className="icon" /> */}
            <span
              className="logo"
              onClick={goToHome}
              onKeyPress={goToHome}
              role="button"
              tabIndex="0"
            />
          </div>

          {props.accessToken ? (
            <>
              <div className="cart" ref={ref}>
                <Button
                  background="purple"
                  className="cart-btn"
                  onClick={() => {
                    window.handleOpenCart && window.handleOpenCart(); // TODO refactor
                  }}
                >
                  <span className="icon" />
                  <span>Cart</span>
                </Button>
                <Button
                  background="transparent"
                  prefix={
                    <img
                      src={imageUrl || IMG.USER_BLANK_AVATAR}
                      alt="avatar"
                      className="myprofile-avatar"
                    />
                  }
                  suffix={
                    <img
                      src={ArrowUp}
                      alt="arrow"
                      className={isInfoUser && 'arrow-up'}
                    />
                  }
                  onClick={() => {
                    setIsInfoUser(s => !s);
                  }}
                  className="myprofile-avatar__wrapper"
                />
                {isInfoUser && (
                  <div className="user-info">
                    <div className="user-info__detail">
                      <img
                        src={imageUrl || IMG.USER_BLANK_AVATAR}
                        alt="avatar"
                        className="myprofile-avatar"
                      />
                      <div className="detail__text">
                        <span className="detail__fullname">
                          {userName.firstName} {userName.lastName}
                        </span>

                        <Link className="profile-link" to="/myprofile">
                          View Profile
                        </Link>
                      </div>
                    </div>
                    {accessToken && (
                      <Button
                        type="secondary"
                        background="transparent"
                        textColor="pink"
                        onClick={logout}
                        prefix={<img src={LogoutIcon} alt="logout icon" />}
                        className="logout__btn"
                      >
                        <span>Log out</span>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-button">
              <Link to="/login">
                <span>Login</span>
              </Link>
              <Link to="/signup">
                <span className="signup">Signup</span>
              </Link>
            </div>
          )}
        </div>
      )}
      {
        <ContactModal
          isShowModal={isContactModalOpen}
          heading={'Contact Us'}
          confirmCallBack={show => setIsContactModalOpen(show)}
          cancelCallBack={() => {
            setIsContactModalOpen(false);
          }}
        />
      }
    </>
  );
};

Header.propTypes = {
  accessToken: PropTypes.string,
  userInfo: PropTypes.object,
};

export default Header;
