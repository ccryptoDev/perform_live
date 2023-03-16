import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber';
import _isNaN from 'lodash/isNaN';
import _pickBy from 'lodash/pickBy';
import _isBoolean from 'lodash/isBoolean';
import AppConstants from 'app/app.constants.json';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { firebaseClient } from './firebase';

export const convertToQueryString = params => {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return queryString;
};

export const useQuery = query => new URLSearchParams(query);

export const replaceURLParams = (apiEndPoint, params) => {
  if (!params) return apiEndPoint;
  let updatedEndPoint = apiEndPoint;
  Object.keys(params).map(key => {
    updatedEndPoint = updatedEndPoint
      .toString()
      .replace(`{${key}}`, params[key]);
    return true;
  });

  return updatedEndPoint;
};

export const throwException = err => {
  throw err;
};

export const getStringifiedObjValuesByKey = (objArray, key, delimiter = ', ') =>
  objArray.map(value => value[key]).join(delimiter);

export const getLocaleString = val => val.toLocaleString('en-IN');

export const naCheck = (...values) => {
  const NA = 'N/A';
  let output;

  if (!values && values[0] !== 0) {
    return NA;
  }

  _forEach(values, val => {
    if (output !== NA && !val && val !== 0) {
      output = NA;
    }
  });

  const isInteger = val => (Number.isInteger(val) ? val : val.toFixed(2));

  if (output !== NA) {
    output = _isNumber(values[0]) ? isInteger(values[0]) : values.join(' ');
  }

  return output;
};

export const unitAttacher = (value, unit, isPrePlaced) => {
  if (value === undefined || value === null || value === 'N/A') {
    return 'N/A';
  }
  if (isPrePlaced) {
    return `${unit} ${value}`;
  }
  return `${value} ${unit}`;
};

export const isBlank = value =>
  (_isEmpty(value) && !_isNumber(value) && !_isBoolean(value)) || _isNaN(value);

export const getObjWithoutBlankProps = obj =>
  _pickBy(obj, value => !isBlank(value));

export const getFullName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (firstName) {
    return firstName;
  }

  if (lastName) {
    return lastName;
  }

  return AppConstants.NOT_AVAILABLE;
};

export const getActiveRouteTab = () => {
  const location = useLocation();
  let activeTab;

  switch (location.pathname) {
    case '/':
      activeTab = 'home';
      break;
    case '/live':
      activeTab = 'live';
      break;

    case '/upcoming':
      activeTab = 'upcoming';
      break;
    case '/popular':
      activeTab = 'popular';
      break;

    default:
      activeTab = 'home';
  }

  return activeTab;
};

export const sendChannelMsg = payload => {
  const defaultPayload = {
    timeStamp: moment()
      .utc()
      .format(),
  };
  const path = `channel_events/${
    window.perform.eventChannelName
  }/channelMessage`;
  firebaseClient.pushData(path, { ...defaultPayload, ...payload.data });
};

export const removeDuplicate = (arrayOfObjects, keys) => {
  const filtered = arrayOfObjects.filter(
    (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(
      new Set(),
    ),
  );
  return filtered;
};
export const roundUpToQuarter = minMinsToAdd => {
  const startMinuts = +moment()
    .add(minMinsToAdd, 'minutes')
    .format('mm');

  // round up to near minuts quarter e.g 00, 15, 30, 45
  let roundUpMinutes;
  switch (true) {
    case startMinuts < 15:
      roundUpMinutes = minMinsToAdd + 15 - startMinuts;
      break;
    case startMinuts < 30:
      roundUpMinutes = minMinsToAdd + 30 - startMinuts;
      break;
    case startMinuts < 45:
      roundUpMinutes = minMinsToAdd + 45 - startMinuts;
      break;
    case startMinuts < 60:
      roundUpMinutes = minMinsToAdd + 60 - startMinuts;
      break;
    default:
      roundUpMinutes = startMinuts;
  }

  return moment()
    .add(roundUpMinutes, 'minutes')
    .toDate();
};

export const checkUrl = () => {
  const currentUrl = window.location.href;
  if (currentUrl.includes(`?`)) {
    if (currentUrl.includes(`&`)) {
      return '&';
    }
    return '?';
  }
  return '/';
};
