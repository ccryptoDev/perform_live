import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useApi } from '../../hooks/api';
import ConfirmationRedeemModal from './components/ConfirmationRedeemModal';
import RedemptionHistory from './components/RedemptionHistory';
import Button from '../../components/Common/Button';
import downIcon from './assets/down.svg';
import upIcon from './assets/up.svg';
import './myEarnings.scss';
import { beautifyPrice } from '../../utils/numbers';

export const MyEarnings = props => {
  const [customerSource, setCustomerSource] = useState(null);
  const [redemptionHistory, setRedemptionHistory] = useState([]);
  const [payoutResult, setPayoutResult] = useState({});
  const [customerEarnings, setEarnigns] = useState('');
  const [isRedeem, setRedeem] = useState(false);
  const [isRedemptionHistoryList, setRedemptionHistoryList] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState(null);

  const {
    getPaymentCustomerSource,
    getPaymentPerformerPaidEarnings,
    getRedemptionHistory,
    postPaymentSourcePayout,
  } = useApi('payment');

  useQuery('customerSource', getPaymentCustomerSource, {
    onSuccess: setCustomerSource,
    onError: () => setCustomerSource(),

    refetchOnWindowFocus: false,
    retryOnMount: true,
    retry: 1,
  });

  useQuery('redemptionHistory', getRedemptionHistory, {
    onSuccess: setRedemptionHistory,
  });

  useQuery('customerEarnings', getPaymentPerformerPaidEarnings, {
    onSuccess: data => {
      setEarnigns(data);
    },
  });

  const redeemEarnings = useMutation(postPaymentSourcePayout, {
    onSuccess: data => {
      setPayoutResult(data);
      setRedeemStatus('success');
      setSpinner(false);
      setEarnigns({ ...customerEarnings, earnings: '0.00' });
    },
    onMutate: () => {
      setSpinner(true);
    },
    onError: err => {
      setPayoutResult(err);
      setRedeemStatus('failed');
      setSpinner(false);
    },
  });

  const handleReddemBtn = () => customerEarnings.earnings === '0.00';

  const handleRedeemEarnings = data => {
    redeemEarnings.mutate(data);
  };

  return (
    <div className="myearnings-container">
      <div className="myearnings-content">
        <div className="myearnings-top">
          <div className="h2">My Earnings</div>
          {customerSource ? (
            <Button
              className="top-button"
              disabled={handleReddemBtn()}
              onClick={() => setRedeem(true)}
            >
              Redeem earnings
            </Button>
          ) : (
            <Link to="payout-account">
              <Button background="transparent" border="gradient">
                Update Payout Account
              </Button>
            </Link>
          )}
        </div>
        <div className="myearnings-body">
          <div className="myearnings-row">
            <div className="myearnings-row__data">
              <div className="myearnings-data__title h3">Pending</div>
              <div className="myearnings-data__description">
                Payments from your customers will appear as pending until they
                are ready to be redeemed.
              </div>
            </div>
            <div className="h3">${customerEarnings.pending}</div>
          </div>
          <div className="myearnings-row">
            <div className="myearnings-row__data">
              <div className="myearnings-data__title h3">Redeemable</div>
              <div className="myearnings-data__description">
                This is the amount which is ready for your withdrawal.
              </div>
            </div>
            <div className="h3">
              ${beautifyPrice(customerEarnings.earnings)}
            </div>
          </div>
          {!!redemptionHistory.length && (
            <div
              className="myearnings-body__history"
              onClick={() => setRedemptionHistoryList(v => !v)}
            >
              View Redemption History
              <img
                alt="dropdown-icon"
                src={isRedemptionHistoryList ? upIcon : downIcon}
              />
              {isRedemptionHistoryList && (
                <RedemptionHistory data={redemptionHistory} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="myearnings-terms">
        Please check our
        <div>
          <Link className="myearnings-terms__link" to="/userAgreement">
            Terms of Service
          </Link>
        </div>
        for more info about redemption.
      </div>
      {isRedeem && (
        <ConfirmationRedeemModal
          userData={{
            ...customerSource,
            customerEarnings: customerEarnings.earnings,
          }}
          onClose={() => {
            setRedeemStatus(null);
            setRedeem(false);
          }}
          onSubmit={handleRedeemEarnings}
          spinner={spinner}
          status={redeemStatus}
          payoutResult={payoutResult}
        />
      )}
    </div>
  );
};

export default MyEarnings;
