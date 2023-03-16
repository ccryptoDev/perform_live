import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './EditModal.scss';
import { useSelector } from 'react-redux';
import LabeledInput from 'app/components/LabeledInput/LabeledInput';
import PhoneNumberInput from 'app/components/PhoneNumberInput/PhoneNumberInput';
import LabeledTextArea from 'app/components/LabeledTextArea/LabeledTextArea';
import IMG from '../../../../utils/images';
import Button from '../../../../components/Common/Button/Button';
import { useApi } from '../../../../hooks/api';
import {
  LinkedInURLValidation,
  FacebookURLValidation,
  TwitterURLValidation,
  InstagramURLValidation,
  ValidEmail,
  checkValidURL,
  checkString,
} from './SocialValid';

const EditModal = props => {
  const {
    heading,
    userInfo,
    uploadAvatar,
    emailVerified,
    phoneVerified,
    selectedAvatar,
    verifyEmail,
    verifyPhone,
    confirmText,
    cancelText,
    confirmCallBack,
    cancelCallBack,
  } = props;
  const history = useHistory();
  const { getPerformerTagOptions } = useApi('performer');
  const { getUserMe } = useApi('user');
  const { postEmailNewPassword, postPhoneNewPassword } = useApi('email');

  const [user, setUserInfo] = useState(userInfo);
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '1 ');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.province || '');
  const [tag, setTag] = useState(user.tag || '');
  const [country, setCountry] = useState(user.country || '');
  const [imageUrl, setImageUrl] = useState(
    user.imageUrl || IMG.USER_BLANK_AVATAR,
  );
  const [stageName, setStageName] = useState(user.stageName || '');
  const [workActivity, setWorkActivity] = useState(user.workActivity || '');
  const [description, setDescription] = useState(user.description || '');
  const [tagList, setTagList] = useState([]);
  const [emailConfirm, setEmailConfirm] = useState(emailVerified);
  const [phoneConfirm, setPhoneConfirm] = useState(phoneVerified);
  const [linkedIn, setLinkedIn] = useState(user.linkedIn || '');
  const [facebook, setFacebook] = useState(user.facebook || '');
  const [twitter, setTwitter] = useState(user.twitter || '');
  const [instagram, setInstagram] = useState(user.instagram || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorStage, setErrorStage] = useState(null);
  const [errortag, setErrorTag] = useState(null);
  const [errorCity, setErrorCity] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [errorCountry, setErrorCountry] = useState(null);
  const [errorLinkedIn, setErrorLinkedIn] = useState(null);
  const [errorFacebook, setErrorFacebook] = useState(null);
  const [errorTwitter, setErrorTwitter] = useState(null);
  const [errorInstagram, setErrorInstagram] = useState(null);
  const [errorOldPassword, setErrorOldPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [authType, setAuthType] = useState(null);

  useEffect(() => setErrorEmail(null), [email]);
  useEffect(() => setErrorPhone(null), [phone]);
  useEffect(() => setErrorStage(null), [stageName]);
  useEffect(() => setErrorTag(null), [tag]);
  useEffect(() => setErrorCity(null), [city]);
  useEffect(() => setErrorState(null), [state]);
  useEffect(() => setErrorCountry(null), [country]);
  useEffect(() => setErrorLinkedIn(null), [linkedIn]);
  useEffect(() => setErrorFacebook(null), [facebook]);
  useEffect(() => setErrorTwitter(null), [twitter]);
  useEffect(() => setErrorInstagram(null), [instagram]);
  useEffect(() => setErrorOldPassword(null), [oldPassword]);
  useEffect(() => setErrorNewPassword(null), [newPassword]);

  useEffect(() => setUserInfo(userInfo), [userInfo]);
  useEffect(() => setEmailConfirm(emailVerified), [emailVerified]);
  useEffect(() => setPhoneConfirm(phoneVerified), [phoneVerified]);

  useEffect(() => {
    getAuthType();
  }, []);

  useEffect(
    () => {
      if (selectedAvatar) {
        setImageUrl(selectedAvatar);
      }
    },
    [selectedAvatar],
  );

  const handleVerifyEmail = () => {
    setErrorEmail(null);
    if (!ValidEmail(email)) {
      setErrorEmail('Invalid email address!');
      return;
    }
    verifyEmail(email);
  };

  const handleVerifyPhone = () => {
    setErrorPhone(null);
    if (!phone) {
      setErrorPhone('Invalid phone number!');
      return;
    }
    verifyPhone(phone);
  };

  const checkValidation = () => {
    if (!ValidEmail(email)) {
      setErrorEmail('Invalid email address');
      return false;
    }
    if (!phone) {
      setErrorPhone('Invalid phone number');
      return false;
    }
    if (!emailConfirm && !phoneConfirm) {
      setErrorEmail('Please verify your email');
      setErrorPhone('Please verify your phone number');
      return false;
    }
    if (!stageName) {
      setErrorStage('This field is required');
      return false;
    }
    if (!tag) {
      setErrorTag('This field is required');
      return false;
    }
    if (!city) {
      setErrorCity('This field is required');
      return false;
    }
    if (!state) {
      setErrorState('This field is required');
      return false;
    }
    if (!country) {
      setErrorCountry('This field is required');
      return false;
    }
    if (!LinkedInURLValidation(linkedIn)) {
      setErrorLinkedIn(' ');
      return false;
    }
    if (!FacebookURLValidation(facebook)) {
      setErrorFacebook(' ');
      return false;
    }
    if (!TwitterURLValidation(twitter)) {
      setErrorTwitter(' ');
      return false;
    }
    if (!InstagramURLValidation(instagram)) {
      setErrorInstagram(' ');
      return false;
    }
    if (oldPassword && oldPassword.length < 8) {
      setErrorOldPassword('Password must be at least 8 characters');
      return false;
    }
    if (newPassword && newPassword.length < 8) {
      setErrorNewPassword('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      workActivity,
      imageUrl: !checkValidURL(imageUrl) ? null : imageUrl,
      stageName,
      tag,
      city,
      province: state,
      country,
      linkedIn: linkedIn ? linkedIn : '',
      facebook: facebook ? facebook : '',
      instagram: instagram ? instagram : '',
      twitter: twitter ? twitter : '',
    };
    if (!checkValidation()) return;
    if (authType == 'email') {
      if (await emailNewPassword()) {
        await confirmCallBack(payload);
      }
    } else if (authType == 'phone') {
      if (await phoneNewPassword()) {
        await confirmCallBack(payload);
      }
    } else {
      await confirmCallBack(payload);
    }
  };

  const getTagOptions = async value => {
    setTag(value);
    try {
      const tagList = await getPerformerTagOptions();
      setTagList(tagList.slice(0, 3));
    } catch (error) {
      console.log('during get the tag options: ', error);
      setErrorTag('This URL is taken, try another one');
    }
  };

  useEffect(() => {
    const getTagList = async () => {
      const tagList = await getPerformerTagOptions();
      setTagList(tagList.slice(0, 3));
    }
    getTagList();
  }, [])

  const setTagValue = event => {
    if (!checkString(event.target.value)) {
      setErrorTag(
        'Username may use only these symbols _ - .(underscore, hyphen and dot)',
      );
    } else {
      setTag(event.target.value);
      getTagOptions(event.target.value);
    }
  };

  const getAuthType = async () => {
    try {
      const authType = await getUserMe();
      setAuthType(authType.authorization);
    } catch (e) {
      console.log('error during get the authType: ', e);
    }
  };

  const emailNewPassword = async () => {
    if (!oldPassword && !newPassword) {
      return true;
    }
    if (oldPassword && !newPassword) {
      setErrorNewPassword('Please input new password');
      return false;
    }
    if (!oldPassword && newPassword) {
      setErrorOldPassword('Please input old password');
      return false;
    }
    if (oldPassword && newPassword) {
      try {
        const result = await postEmailNewPassword({ oldPassword, newPassword });
        if (result.success) {
          return true;
        }
      } catch (error) {
        console.log('error during update the password in email: ', error);
        setErrorOldPassword(error.data.message);
        return false;
      }
      return false;
    }
  };

  const phoneNewPassword = async () => {
    if (!oldPassword && !newPassword) {
      return true;
    }
    if (oldPassword && !newPassword) {
      setErrorNewPassword('Please input new password');
      return false;
    }
    if (!oldPassword && newPassword) {
      setErrorOldPassword('Please input old password');
      return false;
    }
    if (oldPassword && newPassword) {
      try {
        const result = await postPhoneNewPassword({ oldPassword, newPassword });
        if (result.success) {
          return true;
        }
      } catch (error) {
        console.log('error during update the password in email: ', error);
        setErrorOldPassword(error.data.message);
        return false;
      }
    }
  };

  return (
    <div className="profile-alert-modal">
      <div className="modal-bg" />
      <div className="close">
        <img
          src={IMG.MODAL_CLOSE}
          className="close-icon"
          alt="close icon"
          onClick={cancelCallBack}
          role="none"
        />
      </div>
      <h2 className="h2 modal-title">{heading}</h2>
      <div className="modal-edit-body">
        <div className="avatar-upload">
          <img className="profile-avatar" src={imageUrl} />
          <Button
            className="upload-btn"
            type="primary"
            size="medium"
            background="transparent"
            border="gradient"
            onClick={uploadAvatar}
          >
            <img className="upload-avatar" src={IMG.UPLOAD_AVATAR} />
            <span className="btn-title">update photo</span>
          </Button>
        </div>
        <div className="personal-info">
          <div className="info-title">
            <span className="font">
              Profile information
            </span>
          </div>

          <div className="info-content">
            <div className="name">
              <div className="name-row">
                <div className="name-field">
                  <div className="required">
                    <span className="field__label">First name</span>
                    <img src={IMG.ALERT_POINT} />
                  </div>
                  <div className="name-input">{user.firstName}</div>
                </div>
                <div className="name-field">
                  <div className="required">
                    <span className="field__label">Last name</span>
                    <img src={IMG.ALERT_POINT} />
                  </div>
                  <div className="name-input">{user.lastName}</div>
                </div>
              </div>
              <div className="flex-row name-description">
                <span className="description">
                  If you need to change your name, please
                </span>
                <span
                  className="description blue"
                  onClick={() => {
                    history.push('/?contact=true');
                  }}
                >
                  Contact Support
                </span>
              </div>
            </div>
            <div className="form-input-btn">
              <div className="label-input">
                <LabeledInput
                  name="email"
                  placeholder="Email@email.com"
                  label="Email"
                  required
                  useShadow
                  value={email}
                  onChange={event => {
                    setEmailConfirm(false);
                    setEmail(event.target.value);
                  }}
                  error={errorEmail}
                  confirm={emailConfirm}
                />
              </div>
              <div className="verify-btn">
                <Button
                  type="primary"
                  size="large"
                  background="gradient"
                  onClick={handleVerifyEmail}
                  disabled={emailConfirm || !ValidEmail(email)}
                >
                  Verify
                </Button>
              </div>
            </div>
            <div className="form-input-btn">
              <div className="label-input">
                <PhoneNumberInput
                  name="phone"
                  placeholder="Enter your phone number"
                  label="Phone"
                  required
                  useShadow
                  value={phone}
                  onChange={(phoneNumber, country, e) => {
                    setPhoneConfirm(false);
                    setPhone(phoneNumber);
                  }}
                  needFormat={true}
                  error={errorPhone}
                  confirm={phoneConfirm}
                />
              </div>
              <div className="verify-btn">
                <Button
                  type="primary"
                  size="large"
                  background="gradient"
                  onClick={handleVerifyPhone}
                  disabled={!phone || phoneConfirm}
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="personal-info">
          <div className="info-content">
            <LabeledInput
              name="display_name"
              placeholder=""
              label="Display name"
              required
              maxLength={50}
              useShadow
              value={stageName}
              onChange={event => {
                setStageName(event.target.value);
              }}
              error={errorStage}
            />
            <LabeledInput
              name="performlive_name"
              placeholder=""
              prefix="@"
              label="PerformLive @username"
              required
              maxLength={20}
              useShadow
              value={tag}
              onChange={setTagValue}
              error={errortag}
              confirm={!errortag}
            />
            {tagList.length != 0 && (
              <div className="suggestions">
                <span className="suggestion-title">Suggestions:</span>
                {tagList.map((item, index) => (
                  <Button
                    key={index}
                    type="secondary"
                    size="medium"
                    background="transparent"
                    textColor="blue"
                    onClick={() => {
                      setTag(item);
                      setTagList([]);
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            )}

            <LabeledInput
              name="activity"
              placeholder=""
              label="Work activity"
              maxLength={30}
              useShadow
              value={workActivity}
              onChange={event => {
                setWorkActivity(event.target.value);
              }}
            />
            <LabeledTextArea
              name="bio"
              label="Bio"
              placeholder=""
              maxLength="400"
              useShadow
              rows="3"
              value={description}
              onChange={event => {
                setDescription(event.target.value);
              }}
            />
            <LabeledInput
              name="city"
              placeholder=""
              label="City"
              useShadow
              required
              value={city}
              onChange={event => {
                setCity(event.target.value);
              }}
              error={errorCity}
            />
            {/* <AddressAutofillInput
                onChange={(event) => {console.log(event.target.value)}}
              /> */}

            <LabeledInput
              name="state"
              placeholder=""
              label="State / Province / Region"
              useShadow
              required
              value={state}
              onChange={event => {
                setState(event.target.value);
              }}
              error={errorState}
            />
            <LabeledInput
              name="country"
              placeholder=""
              label="Country"
              useShadow
              required
              value={country}
              onChange={event => {
                setCountry(event.target.value);
              }}
              error={errorCountry}
            />
          </div>
        </div>
        <div className="personal-info">
          <div className="info-title">
            <span className="font">My social media</span>
          </div>
          <div className="info-content">
            <LabeledInput
              name="linkedin"
              placeholder=""
              label="Linkedin"
              useShadow
              value={linkedIn}
              onChange={event => {
                setLinkedIn(event.target.value);
              }}
              error={errorLinkedIn}
              warning="Type the full url, like this: https://linkedin.com/in/performlive"
            />
            <LabeledInput
              name="facebook"
              placeholder=""
              label="Facebook"
              useShadow
              value={facebook}
              onChange={event => {
                setFacebook(event.target.value);
              }}
              error={errorFacebook}
              warning="Type the full url, like this: https://facebook.com/performlive"
            />
            <LabeledInput
              name="twitter"
              placeholder=""
              label="Twitter"
              useShadow
              value={twitter}
              onChange={event => {
                setTwitter(event.target.value);
              }}
              error={errorTwitter}
              warning="Type the full url, like this: https://twitter.com/performlive"
            />
            <LabeledInput
              name="instagram"
              placeholder=""
              label="Instagram"
              useShadow
              value={instagram}
              onChange={event => {
                setInstagram(event.target.value);
              }}
              error={errorInstagram}
              warning="Type the full url, like this: https://instagram.com/performlive"
            />
          </div>
        </div>
        {(authType == 'email' || authType == 'phone') && (
          <div className="personal-info">
            <div className="info-title">
              <span className="font">Change password</span>
            </div>
            <div className="info-content">
              <LabeledInput
                name="oldPassword"
                placeholder=""
                label="Enter your password"
                useShadow
                value={oldPassword}
                onChange={event => {
                  setOldPassword(event.target.value);
                }}
                error={errorOldPassword}
                type="password"
                password
              />
              <LabeledInput
                name="newPassword"
                placeholder=""
                label="Create a new password"
                useShadow
                value={newPassword}
                onChange={event => {
                  setNewPassword(event.target.value);
                }}
                error={errorNewPassword}
                type="password"
                password
              />
            </div>
          </div>
        )}
      </div>
      {/* <div className="modal-shadow-top" />
      <div className="modal-shadow-bottom" /> */}
      <div className="modal-action">
        <Button
          className="delete-action"
          type="primary"
          size="medium"
          background="transparent"
          border="gradient"
          onClick={cancelCallBack}
        >
          <span className="btn-title">{cancelText || 'Cancel'}</span>
        </Button>
        <Button
          className="cancel-action"
          type="primary"
          size="large"
          background="gradient"
          onClick={handleConfirm}
        >
          <span className="btn-title">{confirmText || 'Save'}</span>
        </Button>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  heading: PropTypes.string,
  confirmCallBack: PropTypes.func,
  cancelCallBack: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  uploadAvatar: PropTypes.func,
  verifyEmail: PropTypes.func,
};

export default EditModal;
