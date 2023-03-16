import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { useEntity, useApi } from '../../hooks';

import Loader from '../../components/Loader';
import Button from '../../components/Common/Button';
import ArrowLeft from '../../../assets/svg/arrow-left-blue.svg';
import PurchaseCard from '../../components/PurchaseCard';
import SummaryCard from '../../components/SummaryCard';
import { parseOrderDetailsData } from '../../utils';

import './purchaseDetails.scss';

export const PurchaseDetails = () => {
  const history = useHistory();
  const { id } = useParams();

  const { getPaymentCustomerPaidIdId } = useApi('payment');

  const { data: orderDetails } = useEntity({
    id,
    queryKey: 'productsOrder',
    apiFn: getPaymentCustomerPaidIdId,
    config: { onError: () => history.push('/purchase') },
  });

  const returnToPrevScreen = () => history.goBack();

  const {
    createdAt,
    shipping,
    transactions,
    items,
    performance,
    paymentType,
    cashAmount,
  } = parseOrderDetailsData(orderDetails || {});
  return (
    <div className="screen-wrap">
      <Button
        className="back-btn"
        background="transparent"
        onClick={returnToPrevScreen}
      >
        <img className="back-btn-icon" src={ArrowLeft} alt="icon" />
        Back
      </Button>
      {!orderDetails ? (
        <Loader />
      ) : (
        <div className="content-wrap">
          <h1 className="order-details-header">
            {paymentType === 'order' ? 'Order' : 'Transaction'} # {id}
          </h1>

          {shipping ? (
            <SummaryCard date={createdAt} address={shipping} />
          ) : (
            <div className="digital-order-date">
              {moment(createdAt).format('MMM DD, YYYY')}
            </div>
          )}
          <PurchaseCard
            type="purchases"
            price={cashAmount}
            orderCardProps={{ items }}
            transactions={transactions}
            performance={performance}
            paymentType={paymentType}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseDetails;
