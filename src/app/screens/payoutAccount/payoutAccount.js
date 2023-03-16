import React, { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { useApi } from '../../hooks/api';

import './payoutAccount.scss';
import AddBtn from '../../components/AddBtn';
import CreatePayoutAccountForm from './components/CreatePayoutAccountForm';
import PayoutAccountInfo from './components/PayoutAccountInfo';
import plToast from '../../utils/toast';

export const PayoutAccount = props => {
  const queryClient = useQueryClient();

  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [customerSource, setCustomerSource] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const { createBankAccountToken } = useApi('stripe');
  const {
    getPaymentCustomerSource,
    deletePaymentCustomerSource,
    postPaymentCustomerSource,
  } = useApi('payment');

  useQuery('customerSource', getPaymentCustomerSource, {
    onSuccess: setCustomerSource,
    onError: () => setCustomerSource(),

    refetchOnWindowFocus: false,
    retryOnMount: true,
    retry: 1,
  });

  const deletePayoutAccount = useMutation(deletePaymentCustomerSource, {
    onSuccess: () => {
      queryClient.invalidateQueries('customerSource');
      setSpinner(false);
    },

    onMutate: async data => {
      await queryClient.cancelQueries('customerSource');
      const prev = queryClient.getQueryData('customerSource');
      queryClient.setQueryData('customerSource', () => null);
      return { prev };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData('customerSource', context.prev);
    },
  });

  const createAccount = useMutation(postPaymentCustomerSource, {
    onSuccess: data => {
      setCustomerSource(data);
      showCreateAccountForm(false);
      setSpinner(false);
    },
    onMutate: () => {
      setSpinner(true);
    },
  });

  const handleNewBankAccount = () => {
    setShowCreateAccountForm(true);
  };

  const handleDelete = () => {
    deletePayoutAccount.mutate();
  };

  const handlerAccountCreate = useCallback(async formik => {
    if (formik.isValid) {
      const { values } = formik;
      const formData = new URLSearchParams();
      formData.append('bank_account[country]', values.country);
      formData.append('bank_account[currency]', values.currency);
      formData.append(
        'bank_account[account_holder_name]',
        values.accHolderName,
      );
      formData.append(
        'bank_account[account_holder_type]',
        values.accHolderType,
      );
      formData.append('bank_account[routing_number]', values.routingNumber);
      formData.append('bank_account[account_number]', values.accNumber);

      try {
        const { id } = await createBankAccountToken(formData);
        createAccount.mutate({ token: id });
      } catch (err) {
        const message = _get(err, 'data.error.message');
        if (message) plToast.error(message);
      }
    }
  });

  return (
    <div className="payoutaccount-container">
      <div className="payoutaccount-content">
        <h2 className="h2">Payout Account</h2>
        {!customerSource &&
          (!showCreateAccountForm ? (
            <AddBtn onClick={handleNewBankAccount} title="New bank account">
              New bank account
            </AddBtn>
          ) : (
            <CreatePayoutAccountForm
              onSubmit={handlerAccountCreate}
              onClose={() => setShowCreateAccountForm(false)}
              spinner={spinner}
            />
          ))}
        {customerSource && (
          <PayoutAccountInfo
            data={customerSource}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

PayoutAccount.propTypes = {};

export default PayoutAccount;
