import { USStates } from 'app/common';
import transformNameToShortForm from './transformNameToShortForm';

export const prepareShippingInfoForReq = (values = {}) => {
  const {
    firstName,
    lastName,
    phone,
    street,
    city,
    state,
    country,
    zip,
    email,
  } = values;

  return {
    fullname: `${firstName} ${lastName}`,
    phone,
    street,
    city,
    state: transformNameToShortForm(state, USStates),
    country,
    zip,
    email,
  };
};

export default prepareShippingInfoForReq;
