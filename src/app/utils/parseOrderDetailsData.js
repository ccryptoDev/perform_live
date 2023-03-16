const parseOrderDetailsData = data => {
  if (!data) {
    return {
      id: '',
      cashAmount: '',
      createdAt: '',
      updatedAt: '',
      paymentType: '',
      performer: {},
      performance: {},
      shipping: {},
      transactions: [],
      labels: [],
      items: [],
    };
  }

  const {
    id,
    cashAmount,
    createdAt,
    updatedAt,
    paymentType,
    performance,
    performer,
    shipping,
    items,
    transactions,
    labels,
  } = data;

  return {
    id,
    cashAmount,
    createdAt,
    updatedAt,
    paymentType,
    performer,
    performance,
    shipping,
    transactions,
    labels,
    items,
  };
};

export default parseOrderDetailsData;
