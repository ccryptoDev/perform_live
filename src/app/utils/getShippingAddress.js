export const getShippingString = ({ city, country, state, street, zip }) => {
  return [street, city, state, country, zip].join(' ');
};
