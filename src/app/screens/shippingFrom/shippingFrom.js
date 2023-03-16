/**
 *
 * ShipingFrom container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';

import { useApi } from 'app/hooks/api';
import plToast from 'app/utils/toast';
import Loader from 'app/components/Loader';
import { prepareShippingInfoForReq } from 'app/utils';
import { AddBtn, UserDataPreview, ShippingInfoForm } from 'app/components';

import './shippingFrom.scss';

export const ShipingFrom = () => {
  const queryClient = useQueryClient();

  const [spinner, setSpinner] = useState(false);
  const [isVisibleShippingInfoForm, setVisibleShippingInfoForm] = useState(
    false,
  );
  const [isAddedAddress, setAddedAddress] = useState(false);
  const [isVisibleAddAddress, setVisibleAddAddress] = useState(true);
  const [shippingTitleContainer, setTitleContainer] = useState('Shipping From');

  const {
    getPaymentPerformerShipping,
    postPaymentPerformerShipping,
    putPaymentPerformerShipping,
  } = useApi('payment');

  const { data: shippingAddress } = useQuery(
    'performerShippingData',
    () => getPaymentPerformerShipping(),
    {
      onError: () => {
        setVisibleAddAddress(true);
        setAddedAddress(false);
      },
      onSuccess: () => {
        setVisibleAddAddress(false);
        setAddedAddress(true);
      },
      refetchOnWindowFocus: false,
      retryOnMount: true,
      retry: 1,
    },
  );

  const addNewAddress = () => {
    setVisibleShippingInfoForm(true);
    setTitleContainer('Shipping Info');
  };

  const editAddress = () => {
    setVisibleShippingInfoForm(true);
  };

  const onShippingInfoFormSubmit = async values => {
    const payload = prepareShippingInfoForReq(values);
    let response;
    try {
      setSpinner(true);

      if (!isAddedAddress) {
        response = await postPaymentPerformerShipping(payload);
        setAddedAddress(true);
      } else {
        response = await putPaymentPerformerShipping(payload);
      }

      setVisibleShippingInfoForm(false);
    } catch (error) {
      plToast.error(`Can't add your address`);
      setVisibleShippingInfoForm(false);
      setAddedAddress(false);
    } finally {
      queryClient.setQueryData('performerShippingData', response);
      setSpinner(false);
    }
  };

  return (
    <div className="shippingfrom-container">
      <div className="shippingfromcontent-container">
        <div className="content">
          <div className="card">
            <div>
              <h1 className="card-title">{shippingTitleContainer}</h1>
            </div>
            {!isVisibleAddAddress &&
              !isVisibleShippingInfoForm && (
                <UserDataPreview data={shippingAddress} onEdit={editAddress} />
              )}
            {!isVisibleShippingInfoForm &&
              isVisibleAddAddress && (
                <div className="">
                  <AddBtn title="New address" onClick={addNewAddress} />
                </div>
              )}
            {isVisibleShippingInfoForm && (
              <div className="cardform-container">
                <ShippingInfoForm
                  data={shippingAddress}
                  onSubmit={onShippingInfoFormSubmit}
                  onCancel={() => setVisibleShippingInfoForm(false)}
                />
              </div>
            )}
          </div>
          {spinner && <Loader />}
        </div>
      </div>
    </div>
  );
};

ShipingFrom.propTypes = {};

export default ShipingFrom;
