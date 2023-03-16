export const parsePaymentMethodData = (
  paymentMethodData = { paymentMethod: { card: {} } },
) => {
  let last4;
  let brand;

  if (paymentMethodData.paymentMethod.card) {
    brand = paymentMethodData.paymentMethod.card.brand;
    last4 = paymentMethodData.paymentMethod.card.last4;
  } else {
    brand = paymentMethodData.brand;
    last4 = paymentMethodData.last4;
  }

  return { brand, last4 };
};

export default parsePaymentMethodData;
