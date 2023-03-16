export const parseShippingAddress = (shippingAddress = {}) => {
  const {
    fullname = '',
    phone = '',
    street = '',
    city = '',
    state = '',
    country = '',
    zip = '',
  } = shippingAddress;

  return {
    fullname,
    phone,
    street,
    city,
    state,
    country,
    zip,
  };
};

export default parseShippingAddress;
