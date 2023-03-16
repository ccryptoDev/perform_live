import React from 'react';
import { array, object } from 'prop-types';
// import toWords from 'split-camelcase-to-words';

import './styles.scss';
import Row from '../Row';

export const TransactionsDigitalCardSales = ({ dataObject }) => {
  const {
    total,
    earnings,
    plPlatformFee,
    appStoreFee,
    playMarketFee,
  } = dataObject;
  return (
    <>
      <div className="transactions-card-wrap">
        {total && (
          <Row
            item="Total"
            value={total}
            className="transactions-card-row"
            type="first-element"
          />
        )}
        {plPlatformFee && (
          <Row
            item="PerformLive Platform fee"
            value={`-${plPlatformFee}`}
            className="transactions-card-row"
          />
        )}
        {appStoreFee && (
          <Row
            item="AppleStore fee"
            value={`-${appStoreFee}`}
            className="transactions-card-row"
          />
        )}
        {playMarketFee && (
          <Row
            item="PlayMarket fee"
            value={`-${playMarketFee}`}
            className="transactions-card-row"
          />
        )}
        {earnings && (
          <Row
            item="My earnings"
            value={earnings}
            className="transactions-card-row top-line"
            type="bold"
          />
        )}
      </div>
    </>
  );
};

TransactionsDigitalCardSales.propTypes = {
  dataObject: object,
};

export default TransactionsDigitalCardSales;
