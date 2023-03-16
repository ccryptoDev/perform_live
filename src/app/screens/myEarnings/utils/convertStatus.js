const statuses = {
  0: 'Failed',
  1: 'Pending',
  2: 'Paid',
};

const convertStatus = status => statuses[status];

export default convertStatus;
