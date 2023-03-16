import React from 'react';
import { array, object } from 'prop-types';
// import toWords from 'split-camelcase-to-words';

import './styles.scss';
import Row from '../Row';

export const TransactionsCardPurchase = ({ arrayOfKeys, dataObject }) => {
  const { subtotal, shipping, processing, total, taxes } = dataObject;

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
        {taxes && (
          <Row
            item={arrayOfKeys[1]}
            value={taxes}
            className="transactions-card-row"
            type="first-element"
          />
        )}
        {shipping && (
          <Row
            item={arrayOfKeys[2]}
            value={shipping}
            className="transactions-card-row"
            type="first-element"
          />
        )}
        {processing && (
          <Row
            item={arrayOfKeys[3]}
            value={processing}
            className="transactions-card-row"
            type="last-element"
          />
        )}
        {total && (
          <Row
            item={arrayOfKeys[4]}
            value={total}
            className="transactions-card-row top-line"
            type="bold"
          />
        )}
      </div>
    </>
  );
};

TransactionsCardPurchase.propTypes = {
  arrayOfKeys: array,
  dataObject: object,
};

export default TransactionsCardPurchase;
