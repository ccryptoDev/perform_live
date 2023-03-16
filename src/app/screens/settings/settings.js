/**
 *
 * Settings container
 *
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';

import useApi from '../../hooks/api';
import Button from '../../components/Common/Button';
import './settings.scss';
import ChangePasswordForm from './components/ChangePasswordForm';
import CreatePasswordForm from './components/CreatePasswordForm';
import EmailNotificationForm from './components/emailNotificationForm/EmailNotificationFrom';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { resetAuthState } from '../../state/app.actions';
import LogoutIcon from '../../../assets/svg/btns/logout.svg';
import PlusIcon from '../../../assets/svg/btns/plus.svg';
import MinusIcon from './assets/minus.svg';

const changePassowrdMethods = ['email', 'google'];

export const Settings = props => {
  const [passwordOpen, setpasswordOpen] = useState(false);
  const [emailNotfOpen, setEmailNotfOpen] = useState(false);
  const [isForgetPass, setForgetPass] = useState(false);
  const accessToken = useSelector(state => state.global.userInfo.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  const { getUserMe } = useApi('user');
  const { data } = useQuery('getUserMe', () => getUserMe());

  const checkSocialRegistration =
    data && changePassowrdMethods.includes(data.authorization);

  const logout = useCallback(() => dispatch(resetAuthState()));
  return (
    <div className="settings-container">
      <div className="settings-content">
        <div className="settings-content__header">
          <h1 className="h1">Settings</h1>
        </div>
        <div className="settings__card settings__card-direction">
          <div className="h3">
            Sharing settings
            <span className="settings__coming-soon">Coming soon</span>
          </div>
          <Button
            type="secondary"
            background="transparent"
            suffix={<img src={PlusIcon} alt="plus icon" />}
            className="circle-btn"
          />
        </div>
        <div className="settings__card flex-column">
          <div className="settings__card-direction">
            <div className="h3">
              Email notifications settings
              <span className="settings__coming-soon">Coming soon</span>
            </div>
            <Button
              type="secondary"
              background="transparent"
              suffix={
                <img
                  src={emailNotfOpen ? MinusIcon : PlusIcon}
                  alt="plus icon"
                />
              }
              className="circle-btn"
              onClick={() => setEmailNotfOpen(s => !s)}
            />
          </div>
          {emailNotfOpen && (
            <EmailNotificationForm onClose={() => setpasswordOpen(false)} />
          )}
        </div>
        <div className="settings__card settings__card-direction settings__faq">
          <div className="h3">
            <Link to="/faq">FAQ</Link>
          </div>
        </div>

        <div className="settings__card settings__card-direction">
          <div className="h3">Need help?</div>
          <Button
            size="medium-large"
            type="secondary"
            background="transparent"
            textColor="blue"
            onClick={() => {
              history.push('/?contact=true');
            }}
          >
            <span>Contact us</span>
          </Button>
        </div>

        <div className="settings__card flex-column">
          <div className="settings__card-direction">
            <div className="h3">Password</div>
            <Button
              size="medium-large"
              type="secondary"
              background="transparent"
              textColor="blue"
              onClick={() => setpasswordOpen(s => !s)}
            >
              <span>
                {checkSocialRegistration
                  ? 'Change password'
                  : 'Create password'}
              </span>
            </Button>
          </div>
          {passwordOpen &&
            (checkSocialRegistration ? (
              <ChangePasswordForm
                onClose={() => setpasswordOpen(false)}
                onForgetPass={() => setForgetPass(true)}
              />
            ) : (
              <CreatePasswordForm onClose={() => setpasswordOpen(false)} />
            ))}
        </div>
        {accessToken && (
          <Button
            background="transparent"
            border="gradient"
            size="medium"
            fontSize="10px"
            onClick={logout}
            suffix={<img src={LogoutIcon} alt="logout icon" />}
          >
            <span>LOG OUT</span>
          </Button>
        )}
      </div>
      {isForgetPass && (
        <ForgotPasswordModal onClose={() => setForgetPass(false)} />
      )}
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
