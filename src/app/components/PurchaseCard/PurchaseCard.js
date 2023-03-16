import React from 'react';
import './styles.scss';

import { string, object } from 'prop-types';
import DigitalCard from '../DigitalCard';
import OrderCard from '../OrderCard';
import InnerCard from '../InnerCard';
import TransactionsCardSales from '../TransactionsCardSales';
import TransactionsCardPurchase from '../TransactionsCardPurchase';
import TransactionsDigitalCardSales from '../TransactionsDigitalCardSales';

const PurchaseCard = ({
  type,
  price,
  transactions,
  performance,
  paymentType,
  orderCardProps: {
    items,
    fulledBtnClick,
    fulledBtnTitle,
    transparentBtnClick,
    transparentBtnTitle,
  },
}) => {
  const transactionCard =
    paymentType === 'order' ? (
      <TransactionsCardSales
        arrayOfKeys={[
          'Subtotal',
          'Shipping',
          'Processing fee',
          'Taxes',
          'Total',
          'PerformLive Platform fee',
          'My earnings',
        ]}
        dataObject={transactions}
      />
    ) : (
      <TransactionsDigitalCardSales dataObject={transactions} />
    );

  return (
    <div className="purchase-card-container">
      <InnerCard>
        {paymentType === 'order' ? (
          <OrderCard
            items={items}
            fulledBtnClick={fulledBtnClick}
            fulledBtnTitle={fulledBtnTitle}
            transparentBtnClick={transparentBtnClick}
            transparentBtnTitle={transparentBtnTitle}
          />
        ) : (
          <DigitalCard
            performance={performance}
            paymentType={paymentType}
            cashAmount={price}
          />
        )}
        {type === 'sales' ? (
          transactionCard
        ) : (
          <TransactionsCardPurchase
            arrayOfKeys={[
              'Subtotal',
              'Taxes',
              'Shipping',
              'Processing fee',
              'Total',
            ]}
            dataObject={transactions}
          />
        )}
      </InnerCard>
    </div>
  );
};

PurchaseCard.propTypes = {
  type: string,
  price: string,
  transactions: object,
  performance: object,
  paymentType: string,
  orderCardProps: object,
};

export default PurchaseCard;
