import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import reducer from './state/performerInfo.reducer';
import saga from './state/performerInfo.saga';
import { injectReducer, injectSaga } from './performerInfo.dependencies';
import {
  getOnePerformances,
} from './state/performerInfo.actions';

import './performerInfo.scss';
import userIcon from '../../../assets/svg/user.svg';
import phoneIcon from '../../../assets/svg/phone.svg';
import emailIcon from '../../../assets/svg/email.svg';
import editIcon from '../../../assets/svg/edit.svg';

export const PerformerInfo = props => {
  return (
    <div className="performer-info">
      <h1>Personal Info</h1>
      <div className="personal-info">
        <Link to={{pathname: '/myprofile', state: { isOpen: true}}}><img src={editIcon} /></Link>
        <div>
          <img src={userIcon} />
          <p className="">{ props.userInfo.firstName + ' ' + props.userInfo.lastName }</p>
        </div>
        <div>
          <img src={phoneIcon} />
          { props.email && props.email.length > 0 ?
            <p className="">{props.email}</p>
            :
            <Link to={{pathname: '/myprofile', state: { isOpen: true}}}><p className="active">Set up phone number</p></Link>
          }
        </div>
        <div>
          <img src={emailIcon} />
          { props.phone && props.phone.length > 0 ?
            <p className="">{props.phone}</p>
            :
            <Link to={{pathname: '/myprofile', state: { isOpen: true}}}><p className="active">Set up email</p></Link>
          }
        </div>
      </div>
    </div>
  );
};

PerformerInfo.propTypes = {
  userInfo: PropTypes.object,
}

const mapDispatchToProps = () => ({
  getPerformances: getOnePerformances,
});

const mapStateToProps = state => ({
  userInfo: _get(state.global, 'userInfo', {}),
});

const withReducer = injectReducer({
  key: 'performer-info',
  reducer
});

const withSaga = injectSaga({ key: 'performer-info', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PerformerInfo);
 