const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Nov',
  '11': 'Dec',
};

const formateDate = date => {
  const splitedDate = date.split('T')[0].split('-');
  const month = months[splitedDate[1]];

  return `${month} ${splitedDate[2]}, ${splitedDate[0]}`;
};

export default formateDate;
