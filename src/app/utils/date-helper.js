import moment from 'moment';

export const getTimeObjectFromDate = date => {
  const [hour, minute, ampm] = moment(date)
    .format('hh:mm:A')
    .split(':');
  return {
    hour,
    minute,
    ampm,
  };
};

export const getDateFromTimeObject = (date, timeObj) => {
  const { hour, minute, ampm } = timeObj;
  return moment(date)
    .set('hour', convertHours12to24(hour, ampm))
    .set('minute', minute)
    .toDate();
};

const convertHours12to24 = (hours12, modifier) => {
  let hours = hours12;

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return hours;
};
