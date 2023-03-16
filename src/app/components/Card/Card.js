import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import './card.scss';
import _get from 'lodash/get';
import IMG from 'app/utils/images';
import { PERFORMANCE_STATUS } from 'app/app.constants.json';
import { useDispatch, useSelector } from 'react-redux';
import { openPerformReport } from '../../state/app.actions';

import { getFullName } from '../../utils/common';
import Button from '../Common/Button';
import CardHeader from './components/CardHeader';
import CardFooter from './components/CardFooter';
import DateBadge from '../DateBadge/DateBadge';
import TimeBadge from '../TimeBadge/TimeBadge';
import Block from '../Block/Block';
import { useResizeImage } from '../../hooks/useResizeImage';

const values = ['Report'];

const Card = props => {
  const myId = useSelector(state => _get(state, 'global.userInfo.id'));
  const dispatch = useDispatch();
  const {
    performanceData,
    type,
    handleCardClick,
    handleRegister,
    handleJoin,
    onLikeDislikeClick = () => null,
    onShare,
  } = props;
  const {
    performer,
    id,
    startDatetime,
    endDatetime,
    participationPaid,
    participationPurchase = {},
    maxAudienceSize,
    state,
    coverUrl,
    name,
    isPaid,
    registeredByMe,
  } = performanceData;

  const history = useHistory();
  const img = useResizeImage();
  const resizedCover = img(coverUrl, 400);

  const fullName =
    _get(performer, 'stageName', null) ||
    getFullName(
      _get(performer, 'firstName', ''),
      _get(performer, 'lastName', ''),
    );

  const handleGoLive = e => {
    e.stopPropagation();
    // if (type === PERFORMANCE_STATUS.PAST) {
    //   history.push(
    //     `/finishperformance/${performanceData.id}
    //     `,
    //   );
    // } else {
    // }
    history.push(
      `/performlive/${performanceData.id}/performer/${
        performanceData.performer.id
      }`,
    );
  };

  const onCardClick = e => {
    if (type === PERFORMANCE_STATUS.PUBLISHED) {
      handleCardClick(performanceData);
    } else if (type === PERFORMANCE_STATUS.PAST) {
      history.push(
        `/finishperformance/${performanceData.id}
        `,
      );
    }
  };

  const showDate = [
    PERFORMANCE_STATUS.PUBLISHED,
    PERFORMANCE_STATUS.PAST,
  ].includes(type);

  const myPerformance = _get(performanceData, 'performer.id') === myId;

  const participationPrice =
    participationPaid && participationPurchase
      ? _get(participationPurchase, 'label')
      : 'Free';

  const PerformReport = () => {
    if (!myId) {
      history.push('/login');
    } else {
      const data = {
        state: 'opened',
        data: {
          performerId: performer.id,
          performanceId: performanceData.id,
        },
      };
      dispatch(openPerformReport(data));
    }
  };

  const goProfile = () => {
    history.push(`otherprofile?id=${performanceData.performer.id}`);
  };
  return (
    <div className={cn('card', type)} onClick={onCardClick}>
      <div className="card-body">
        <div className="thumbnail-wrapper">
          <div
            className="thumbnail"
            style={{
              backgroundImage: `url(${resizedCover || IMG.PERFORMER_THUMB})`,
            }}
          />
          <CardFooter
            avatarUrl={_get(performer, 'imageUrl') || IMG.USER}
            price={participationPrice}
            name={fullName}
          >
            {type === PERFORMANCE_STATUS.LIVE &&
              !myPerformance && (
                <Button
                  fontSize="12px"
                  className="join-btn"
                  onClick={() => handleJoin(performanceData)}
                >
                  join now
                </Button>
              )}

            {type === PERFORMANCE_STATUS.PUBLISHED &&
              !myPerformance && (
                <Button
                  background={
                    registeredByMe || isPaid ? 'glassy-white' : 'gradient'
                  }
                  fontSize="12px"
                  className="join-btn"
                  onClick={() => {
                    if (registeredByMe || isPaid) {
                      return;
                    }
                    handleRegister(performanceData);
                  }}
                >
                  {registeredByMe || isPaid ? 'Registered' : 'Register'}
                </Button>
              )}

            {myPerformance &&
              type !== PERFORMANCE_STATUS.PAST && (
                <Button
                  fontSize="12px"
                  className="join-btn"
                  onClick={handleGoLive}
                >
                  go live
                </Button>
              )}
          </CardFooter>
        </div>

        <CardHeader
          eyeCount={maxAudienceSize}
          performanceType={state}
          type={type}
          price={participationPaid ? participationPrice : 'Free'}
          startDatetime={startDatetime}
          endDatetime={endDatetime}
          performance={performanceData}
          onLikeDislikeClick={onLikeDislikeClick}
        />
        <div className="blockIcon">
          <Block
            userInfo={performer}
            performInfo={performanceData}
            direction="left"
            values={['Report']}
            where="perform"
            OpenPerformReport={PerformReport}
          />
        </div>
        {onShare && (
          <div
            className="card__share"
            onClick={e => {
              e.stopPropagation();
              onShare(performanceData);
            }}
          >
            <img src={IMG.SHARE_ICON} alt="share icon" />
          </div>
        )}
        <CardFooter
          avatarUrl={_get(performer, 'imageUrl') || IMG.USER}
          price={participationPrice}
          name={fullName}
          onClickAvatar={goProfile}
        >
          {type === PERFORMANCE_STATUS.LIVE &&
            !myPerformance && (
              <Button
                fontSize="12px"
                className="join-btn"
                onClick={() => handleJoin(performanceData)}
              >
                join now
              </Button>
            )}

          {type === PERFORMANCE_STATUS.PUBLISHED &&
            !myPerformance && (
              <Button
                background={
                  registeredByMe || isPaid ? 'glassy-white' : 'gradient'
                }
                fontSize="12px"
                className="join-btn"
                onClick={e => {
                  if (registeredByMe || isPaid) {
                    return;
                  }
                  e.stopPropagation();
                  handleRegister(performanceData);
                }}
              >
                {registeredByMe || isPaid ? 'Registered' : 'Register'}
              </Button>
            )}

          {myPerformance &&
            type !== PERFORMANCE_STATUS.PAST && (
              <Button
                fontSize="12px"
                className="join-btn"
                onClick={handleGoLive}
              >
                go live
              </Button>
            )}
        </CardFooter>
      </div>

      <div className="perform-footer">
        <div className="actions">
          <div className="date-time">
            {showDate && <DateBadge date={startDatetime} />}
            <TimeBadge startDate={startDatetime} endDate={endDatetime} />
          </div>
        </div>

        <span className="card-title">{name}</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  performanceData: PropTypes.object,
  type: PropTypes.string,
};

export default Card;
