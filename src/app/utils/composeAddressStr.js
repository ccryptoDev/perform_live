export const composeAddressStr = (data = {}) => {
  const { street = '', city = '', state = '', country = '', zip = '' } = data;

  return `${street}, ${city}, ${state}, ${zip}, ${country}`;
};

export default composeAddressStr;
