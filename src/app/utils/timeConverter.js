import AppConstants from 'app/app.constants.json';
import moment from 'moment';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getMonthName = number => months[number];

export const getShortMonthName = number => shortMonthNames[number];

export const addZero = number =>
  number.toString().length === 1 ? `0${number}` : number;

export const getDateWithSlash = dateStr => {
  const dateObj = new Date(dateStr);
  return !dateStr || dateStr === AppConstants.NOT_AVAILABLE
    ? AppConstants.NOT_AVAILABLE
    : `${addZero(dateObj.getMonth() + 1)}/${addZero(
        dateObj.getDate(),
      )}/${dateObj.getFullYear()}`;
};

export const getDateWithMonthName = dateStr => {
  const dateObj = new Date(dateStr);
  return !dateStr || dateStr === AppConstants.NOT_AVAILABLE
    ? AppConstants.NOT_AVAILABLE
    : `${dateObj.getDate()} ${getMonthName(
        dateObj.getMonth(),
      )}, ${dateObj.getFullYear()}`;
};

export const getTime = dateStr => {
  const dateObj = new Date(dateStr);
  return !dateStr || dateStr === AppConstants.NOT_AVAILABLE
    ? AppConstants.NOT_AVAILABLE
    : `${addZero(dateObj.getHours())}:${addZero(dateObj.getMinutes())}`;
};

export const getUpdatedDateByDate = (date, isPastDate, daysNo) =>
  isPastDate
    ? date.setDate(date.getDate() - daysNo)
    : date.setDate(date.getDate() + daysNo);

export const getUpdatedDateByMonth = (date, isPastDate, monthsNo) =>
  isPastDate
    ? date.setMonth(date.getMonth() - monthsNo)
    : date.setMonth(date.getMonth() + monthsNo);

export const getDateTS = dateStr => {
  const dateObj = new Date(dateStr);
  return dateObj ? dateObj.getTime() : null;
};

export const getDateTimeWithSlash = dateStr => {
  const dateObj = new Date(dateStr);
  return !dateStr || dateStr === AppConstants.NOT_AVAILABLE
    ? AppConstants.NOT_AVAILABLE
    : `${dateObj.getDate()}-${getShortMonthName(dateObj.getMonth())} ${getTime(
        dateStr,
      )}`;
};
export const addHours = (date, hour) => (date ? date.getHours() + hour : null);

export const getStartTimeOfDay = date =>
  date ? date.setHours(0, 0, 0, 0) : null;

export const getEndTimeOfDay = date =>
  date ? date.setHours(23, 59, 59, 999) : null;

export const minutesToHHMM = minutes => {
  if (minutes === null || minutes === undefined) {
    return minutes;
  }
  let hour = minutes / 60;
  hour = parseInt(hour, 10);
  let remainingMinutes = minutes % 60;
  hour = hour.toString();
  remainingMinutes = remainingMinutes.toString();

  if (hour.length === 1) {
    hour = '0'.concat(hour);
  }
  if (remainingMinutes.length === 1) {
    remainingMinutes = '0'.concat(remainingMinutes);
  }
  return `${hour}:${remainingMinutes}`;
};

export const convertTo12HrFormat = time24Hr => {
  const splitTime = time24Hr.split(':');
  const hours = addZero(splitTime[0]);
  const minutes = addZero(splitTime[1]);
  // switch (true) {
  //   case time24Hr === 0:
  //     return '12:00 AM';
  //   case time24Hr < 12:
  //     return `${addZero(time24Hr)}:00 AM`;
  //   case time24Hr === 12:
  //     return `${time24Hr}:00 PM`;
  //   case time24Hr > 12:
  //     return `${addZero(time24Hr - 12)}:00 PM`;
  //   default:
  //     return time24Hr;
  // }

  switch (true) {
    case +hours === 0:
      return `12:${minutes}`;
    case +hours < 12:
      return `${hours}:${minutes}`;
    case +hours === 12:
      return `${hours}:${minutes}`;
    case +hours > 12:
      return `${addZero(hours - 12)}:${minutes}`;
    default:
      return '';
  }
};

export const convertTime12to24 = (time12h, AMPM) => {
  let [hours, minutes] = time12h.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (AMPM === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const checkAMPM = time24Hr => {
  const splitTime = time24Hr.split(':');
  const hours = splitTime[0];
  switch (true) {
    case hours === 0:
      return 'AM';
    case hours < 12:
      return 'AM';
    case hours === 12:
      return 'PM';
    case hours > 12:
      return 'PM';
    default:
      return 'PM';
  }
};

export const getStartEndTime = (timeFrom, date, time, AMPM) => {
  const updatedTime = convertTime12to24(time, AMPM);
  const startDateLocal = `${date} ${updatedTime}`;
  const startEndTime = moment(
    moment(startDateLocal, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
  )
    .add(timeFrom === 'startTime' ? 60 : -60, 'minutes')
    .format('HH:mm:A');
  const [hour, minute, ampm] = startEndTime.split(':');
  return { hour, minute, ampm };
};

export const getTimeDiff = (startDate, endDate) => {
  const ms = moment(endDate).diff(moment(startDate));
  const d = moment.duration(ms);
  const s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');
  return s;
};
