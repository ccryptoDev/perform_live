import React from 'react';
import { array, object } from 'prop-types';
// import toWords from 'split-camelcase-to-words';

import './styles.scss';
import Row from '../Row';

export const TransactionsCardSales = ({
  arrayOfKeys,
  dataObject,
  paymentType = 'order',
}) => {
  const {
    subtotal,
    shipping,
    processing,
    total,
    taxes,
    plPlatformFee,
    earnings,
    appStoreFee,
  } = dataObject;

  // [
  //   'Subtotal',
  //   'Shipping',
  //   'Processing fee',
  //   'Taxes',
  //   'Total',
  //   'Performlive fee',
  //   'My earnings',
  // ]
  return (
    <>
      <div className="transactions-card-wrap">
        {subtotal && (
          <Row
            item={arrayOfKeys[0]}
            value={subtotal}
            className="transactions-card-row bottom-line"
            type="bold"
          />
        )}
        {paymentType === 'order' && (
          <div className="subtitle">Customer paid</div>
        )}
        {(subtotal || total) && (
          <Row
            item={arrayOfKeys[0]}
            value={subtotal || total}
            className="transactions-card-row"
            type="first-element"
          />
        )}
        {shipping && (
          <Row
            item={arrayOfKeys[1]}
            value={shipping}
            className="transactions-card-row"
          />
        )}
        {processing && (
          <Row
            item={arrayOfKeys[2]}
            value={processing}
            className="transactions-card-row"
          />
        )}
        {taxes && (
          <Row
            item={arrayOfKeys[3]}
            value={taxes}
            className="transactions-card-row"
          />
        )}
        {total && (
          <Row
            item={arrayOfKeys[4]}
            value={total}
            className="transactions-card-row bottom-line"
          />
        )}
        {paymentType === 'order' && <div className="subtitle">My earnings</div>}
        {subtotal && (
          <Row
            item={arrayOfKeys[0]}
            value={subtotal}
            className="transactions-card-row"
          />
        )}
        {plPlatformFee && (
          <Row
            item={arrayOfKeys[5]}
            value={`-${plPlatformFee}`}
            className="transactions-card-row"
          />
        )}
        {subtotal &&
          plPlatformFee && (
            <Row
              item={arrayOfKeys[6]}
              value={earnings}
              className="transactions-card-row top-line"
              type="bold"
            />
          )}
      </div>
    </>
  );
};

TransactionsCardSales.propTypes = {
  arrayOfKeys: array,
  dataObject: object,
};

export default TransactionsCardSales;
