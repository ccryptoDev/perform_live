import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import Ellipse from '../../../assets/svg/footer/ellipse.svg';
import Instagram from './Instagram.svg';
import './Footer.scss';

import IMG from '../../utils/images';

export default function Footer() {
  const [showFooter, setFooter] = useState(true);
  const [footerFullWidth, setFooterFullWidth] = useState(false);
  const location = useLocation();
  const url = `https://web-dev.performlive.live${location.pathname}`;
  const [isAppStoreShow, setIsAppStoreShow] = useState(true);
  const [isGoogleStoreShow, setIsGoogleStoreShow] = useState(true);

  useEffect(
    () => {
      const currentRoute = location.pathname;
      // console.log(currentRoute);
      if (
        currentRoute === '/privacy' ||
        currentRoute === '/userAgreement' ||
        currentRoute === '/performancescheduler' ||
        currentRoute === '/faq' ||
        currentRoute.includes('performlive') ||
        currentRoute.includes('agorarecording') ||
        currentRoute.includes('performance/edit') ||
        currentRoute === '/login' ||
        currentRoute === '/signup' ||
        currentRoute === '/forgetPassword' ||
        currentRoute === '/verification'
      ) {
        setFooter(false);
      } else {
        setFooter(true);
      }
      setFooterFullWidth(false);
      if (currentRoute.includes('finishperformance')) {
        setFooterFullWidth(true);
      }
    },
    [location],
  );
  return (
    <>
      {showFooter && (
        <div className={cn('footer', { 'full-width-footer': footerFullWidth })}>
          <img src={Ellipse} alt="ellipse" className="ellipse-left" />
          <div className="app-google-stores">
            <div
              className="app-store"
              onMouseEnter={() => setIsAppStoreShow(s => !s)}
              onMouseLeave={() => setIsAppStoreShow(s => !s)}
            >
              {isAppStoreShow ? (
                <img src={IMG.APP_STORE} alt="app-store__img" />
              ) : (
                <div className="app__coming-soon">Coming soon</div>
              )}
            </div>
            <div
              className="google-store"
              onMouseLeave={() => setIsGoogleStoreShow(s => !s)}
              onMouseEnter={() => setIsGoogleStoreShow(s => !s)}
            >
              {isGoogleStoreShow ? (
                <img src={IMG.PLAY_STORE} alt="google-store__img" />
              ) : (
                <div className="app__coming-soon">Coming soon</div>
              )}
            </div>
          </div>
          <div className="footer-details">
            <div className="copyright">
              © PerformLive. All rights Reserved 2021.
            </div>
            <div className="links">
              <Link className="link" to="/?contact=true">
                Contact us
              </Link>
              <Link className="link" to="/faq">
                FAQ
              </Link>
              <Link className="link" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="link" to="/userAgreement">
                Terms & Conditions
              </Link>
            </div>
            <div className="social-links">
              <button
                className="share-button"
                onClick={() =>
                  window.open('https://www.facebook.com/performlive.live/')
                }
              >
                <FacebookIcon size={24} round className="share-icon" />
              </button>

              <button
                className="share-button"
                onClick={() =>
                  window.open('https://www.linkedin.com/company/performlive/')
                }
              >
                <LinkedinIcon size={24} round className="share-icon" />
              </button>

              <button
                className="share-button"
                onClick={() => window.open('https://twitter.com/iperformlive')}
              >
                <TwitterIcon size={24} round className="share-icon" />
              </button>

              <button
                className="share-button"
                onClick={() =>
                  window.open('https://www.instagram.com/performlive.live/')
                }
              >
                <img src={Instagram} alt="inst-icon" />
              </button>
            </div>
          </div>
          <img src={Ellipse} alt="ellipse" className="ellipse-right" />
        </div>
      )}
    </>
  );
}

Footer.propTypes = {};
