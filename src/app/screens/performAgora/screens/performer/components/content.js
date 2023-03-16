import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';
import moment from 'moment';
import AppConstants from 'app/app.constants.json';
import config from 'app/config/index.config';
// import ReviewModal from './ReviewModal';
import LiveButtons from './LiveButtons';
import Stream from '../../../components/Streams';
import { IMG } from '../performer.dependencies';
import '../../../../../styles/content.scss';
import GoLiveModal from './GoLiveModal';
import FullScreen from '../../../components/FullScreen/FullScreen';
import { getFullName, sendChannelMsg } from '../../../../../utils/common';
import { TimeCounter } from '../../../../../components/TimeCounter/TimeCounter';
import ShareBarSmall from '../../../../../components/ShareBarSmall/ShareBarSmall';
import { setPerformanceStateFinished } from '../../../state/performAgora.actions';
// import ProductManagement from '../../../../productManagement/productManagement';
import DisplayReaction from '../../../components/Reactions/displayReaction';
import ProductsPerformanceView from '../../../../productManagement/components/productsViewLayouts/ProductsPerformanceView';
import { usePerformanceProducts } from '../../../../../hooks/usePerformanceProducts.query';
import { PerformAgoraConstants } from '../../../performAgora.constants';

const ShowProfile = () => (
  <>
    <div className="show-profile">
      <div className="profile-description">
        <div className="profile-avatar">
          <img className="profile-img" src={IMG.PROFILE} alt="profile avatar" />
        </div>
        <div className="profile-info">
          <div className="profile-name">BIO</div>
          <div className="profile-notes">
            Kenny Semba has been at the nexus of music, fashion, and nightlife
            for over half his living years as the go-to deejay for music
            impresarios, entertainment moguls, fashion icons, cultural
            trendsetters, and even world leaders. Kenny Semba has been at the
            nexus of music, fashion, and nightlife for over half his living
            years as the go-to deejay for music
          </div>
          <div className="social-btns">
            <div>
              <img
                className="instagram-icon"
                src={IMG.INSTAGRAM}
                alt="instagram icon"
              />
              <Link to="#" className="instagram-btn">
                Instagram
              </Link>
            </div>
            <div>
              <img
                className="twitter-icon"
                src={IMG.TWITTER}
                alt="twitter icon"
              />
              <Link to="#" className="twitter-btn">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Top = ({ toggleExpand }) => {
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.global.userInfo);
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );

  // const [openShareModal, setOpenShareModal] = React.useState(false);
  const handleExpand = () => {
    setExpand(!expand);
    toggleExpand(!expand);
  };
  const fullName =
    _get(performanceData.performer, 'stageName', null) ||
    getFullName(
      performanceData.performer.firstName,
      performanceData.performer.lastName,
    );

  const handlePerformanceTimeOver = () => {
    dispatch(
      setPerformanceStateFinished({
        paramsToReplace: { id: performanceData.id },
      }),
    );
  };
  return (
    <>
      <div className={expand ? 'perform-top active' : 'perform-top'}>
        <div className={open ? 'live-detail' : 'live-detail active'}>
          <div className="live-avatar">
            <img
              className="live-pic"
              src={performanceData.performer.imageUrl || IMG.USER}
              alt="live avatar"
            />
            {performanceData.state === 'live' && (
              <button className="live-status" type="button">
                {performanceData.state.toUpperCase()}
              </button>
            )}
          </div>
          <div className="live-info">
            <div className="review">{performanceData.name}</div>
            <div className="live-name">
              <span className="live-name-info">{fullName}</span>
              <ShareBarSmall
                title="Check out my Live on PerformLive! Join me on PerformLive!"
                hashtags={[
                  'performlive',
                  'iperformwithPL',
                  'streamingonPL',
                  'createandperform',
                  'performlivePL',
                  'performlivetalent',
                ]}
                url={`${config.CLIENT_URL}/performlive/${
                  performanceData.id
                }/performer/${performanceData.performer.id}`}
              />

              {open ? <ShowProfile /> : null}
            </div>
          </div>
        </div>
        {performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE && (
          <div className="live-time">
            <div className="live-time-logo">
              <div className="timing">
                <img className="time-logo" src={IMG.TIMER} alt="timing" />
              </div>

              <div className="timing-info">
                <span className="time-now">
                  <TimeCounter
                    onTimeOver={() => handlePerformanceTimeOver()}
                    startTime={performanceData.endDatetime}
                    onTimeStart={() => {}}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
        {/* <SocialShareLink
          show={openShareModal}
          Hide={() => setOpenShareModal(false)}
        /> */}
      </div>
    </>
  );
};

const Bottom = () => {
  const [show, setShow] = React.useState(true);
  const [isAudioOn, setAudioOn] = React.useState(true);
  const [isVideoOn, setVideoOn] = React.useState(true);

  const performerId = useSelector(state =>
    state.performagora.performanceData.performer.id.toString(),
  );

  const getPerformerStream = React.useCallback(
    () =>
      window.perform.bordCastRTCClient
        ? window.perform.bordCastRTCClient
            .getStreams()
            .find(stream => stream.getId().toString() === performerId)
        : null,
    [performerId],
  );

  const performerStream = getPerformerStream();

  React.useEffect(
    () => {
      setAudioOn(performerStream ? performerStream.isAudioOn() : true);
      setVideoOn(performerStream ? performerStream.isVideoOn() : true);
    },
    [performerStream],
  );

  const onMicroToggle = React.useCallback(
    () => {
      const stream = getPerformerStream();
      if (stream) {
        stream[isAudioOn ? 'muteAudio' : 'unmuteAudio']();
        setAudioOn(!isAudioOn);
      }
    },
    [performerStream, isAudioOn],
  );
  const onCameraToggle = React.useCallback(
    () => {
      const stream = getPerformerStream();
      if (stream) {
        stream[isVideoOn ? 'muteVideo' : 'unmuteVideo']();
        setVideoOn(!isVideoOn);
      }
    },
    [performerStream, isVideoOn],
  );

  return (
    <>
      <div className="perform-bottom">
        <FullScreen />
        <div className="flex-row">
          <button
            onClick={onMicroToggle}
            type="button"
            className="preformer-screen__bottom-button"
          >
            {isAudioOn ? (
              <img src={IMG.AUDI_MIC_ON} alt="Toggle microphone" />
            ) : (
              <img src={IMG.AUDI_MIC_OFF} alt="Toggle microphone" />
            )}
          </button>
          <button
            onClick={onCameraToggle}
            type="button"
            className="preformer-screen__bottom-button"
          >
            <img
              src={isVideoOn ? IMG.AUDI_CAMERA_ON : IMG.AUDI_CAMERA_OFF}
              alt="Toggle camera"
            />
          </button>
        </div>
        <div />
      </div>
      {/* <HeartReaction /> */}
      <div className={show ? 'mask-back toggle-item' : 'mask-back'} />
    </>
  );
};

const Content = ({
  handleToggle,
  performanceData = {},
  onSettingClick,
  onConfirmFinish,
}) => {
  const [toggle, setToggle] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();
  const changeExpand = () => {
    setToggle(!toggle);
    handleToggle(!toggle);
  };

  const { performanceProducts } = usePerformanceProducts(performanceData.id);

  if (!window.perform) {
    history.push('/');
  }

  useEffect(
    () => {
      // send firebase msg in channel
      if (performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE) {
        const data = {
          messageType:
            PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.PERFORMANCE_IS_LIVE,
          timeStamp: moment()
            .utc()
            .format(),
        };

        sendChannelMsg({ data });
      }
    },
    [performanceData.state],
  );
  return (
    <>
      <div
        className={toggle ? 'content-body active' : 'content-body'}
        id="content-body"
      >
        <div className="perform-body">
          <Top toggleExpand={changeExpand} />
          <Stream />
          <Bottom />
          {performanceData.state ===
            AppConstants.PERFORMANCE_STATUS.PUBLISHED && (
            <GoLiveModal
              performanceStartTime={performanceData.startDatetime}
              performanceId={performanceData.id}
              openSettingClick={onSettingClick}
            />
          )}

          <ProductsPerformanceView productList={performanceProducts} />

          {performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE && (
            <LiveButtons
              openSettingClick={onSettingClick}
              onConfirmFinish={onConfirmFinish}
            />
          )}

          <div className="reaction-box">
            <DisplayReaction listenToReactionEvents />
          </div>
        </div>
      </div>
    </>
  );
};

Content.propsTypes = {
  performanceData: PropTypes.object,
  onSettingClick: PropTypes.func,
};

export default memo(Content);
