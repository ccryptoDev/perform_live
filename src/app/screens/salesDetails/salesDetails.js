import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import NewWindow from 'react-new-window';

import { useEntity, useApi } from '../../hooks';
import { getPerformerName } from './state/salesDetails.selector';

import ShippingInfoForm from '../../components/ShippingInfoForm';
import Loader from '../../components/Loader';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Inputs/Checkbox';
import Modal from '../../components/Common/Modal';
import plToast from '../../utils/toast';
import ArrowLeft from '../../../assets/svg/arrow-left-blue.svg';
import PurchaseCard from '../../components/PurchaseCard';
import SummaryCard from '../../components/SummaryCard';
import {
  parseOrderDetailsData,
  prepareShippingInfoForReq,
  downloadDocument,
  getDocumentNameFromUrl,
} from '../../utils';

import './salesDetails.scss';

export const SalesDetails = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { firstName, lastName } = useSelector(getPerformerName);

  const [currentShippingLabel, setCurrentShippingLabel] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);
  const [shippingFromForm, setShippingFromForm] = useState(false);
  const [shippingLabelsData, setShippingLabelsData] = useState([]);
  const [isCheckPreparePackage, setCheckPreparePackage] = useState(false);
  const [isCheckPrintLabel, setCheckPrintLabel] = useState(false);
  const [isCheckMailPackage, setCheckMailPackage] = useState(false);
  const {
    getPaymentPerformerShipping,
    postPaymentPerformerShipping,
    getPaymentPerformerPaidIdId,
    postPaymentPerformerShipmentLabelPaymentId,
  } = useApi('payment');

  useQuery(
    'shippingLabelsData',
    () => postPaymentPerformerShipmentLabelPaymentId(id),
    {
      onSuccess: data => {
        setShippingLabelsData(data);
      },
    },
  );

  const { data: performerShippingData } = useQuery(
    'performerShippingData',
    () => getPaymentPerformerShipping(),
  );

  const { data: salesDetails } = useEntity({
    id,
    queryKey: 'productsSales',
    apiFn: getPaymentPerformerPaidIdId,
    config: { onError: () => history.push('/sales') },
  });

  const returnToPrevScreen = () => history.goBack();

  const onShippingInfoFormSubmit = async values => {
    const payload = prepareShippingInfoForReq(values);
    try {
      setSpinner(true);
      const performerShippingDataRes = await postPaymentPerformerShipping(
        payload,
      );
      const shippingLabelsDataRes = await postPaymentPerformerShipmentLabelPaymentId(
        id,
      );
      setShippingLabelsData(shippingLabelsDataRes);
      queryClient.setQueryData(
        'performerShippingData',
        performerShippingDataRes,
      );
      queryClient.setQueryData('shippingLabelsData', shippingLabelsDataRes);
      plToast.success(`Success! Now you can download Shipping labels.`);
    } catch (error) {
      plToast.error(`Can't add your address. Try again late.`);
    } finally {
      setSpinner(false);
      setShippingFromForm(false);
      setIsStepsModalOpen(true);
    }
  };

  const downloadShipLabel = itemId => {
    if (!performerShippingData) {
      setShippingFromForm(true);
      return;
    }
    setSpinner(true);
    const [productLabelData] = shippingLabelsData.filter(
      ({ productId }) => productId === itemId,
    );
    if (!(productLabelData && productLabelData.pdf)) {
      setSpinner(false);
      queryClient.refetchQueries('shippingLabelsData');
      plToast.error(`Can't generate shipping label. Try again late.`);
      return;
    }
    setCurrentShippingLabel(productLabelData.pdf);
    setSpinner(false);
  };

  const {
    createdAt,
    shipping,
    transactions,
    items,
    performance,
    paymentType,
    cashAmount,
  } = parseOrderDetailsData(salesDetails || {});

  return (
    <>
      <div className="screen-wrap">
        <Button
          className="back-btn"
          background="transparent"
          onClick={returnToPrevScreen}
        >
          <img className="back-btn-icon" src={ArrowLeft} alt="icon" />
          Back
        </Button>
        {!salesDetails || spinner ? (
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
              type="sales"
              price={cashAmount}
              orderCardProps={{
                items,
                fulledBtnClick: downloadShipLabel,
                fulledBtnTitle: 'Download shipping label',
                transparentBtnClick: () => setIsStepsModalOpen(true),
                transparentBtnTitle: 'Follow few steps to ship the order',
              }}
              transactions={transactions}
              performance={performance}
              paymentType={paymentType}
            />
          </div>
        )}
      </div>
      <Modal
        isModalOpen={isStepsModalOpen}
        title="Follow few steps to ship the order"
        className="shipping__modal"
      >
        <div>
          <Checkbox
            label="Prepare your package"
            className="steps__option"
            onChange={() => setCheckPreparePackage(!isCheckPreparePackage)}
            checked={isCheckPreparePackage}
          />
          <Checkbox
            label="Print shipping label"
            className="steps__option"
            onChange={() => setCheckPrintLabel(!isCheckPrintLabel)}
            checked={isCheckPrintLabel}
          />
          <Checkbox
            label="Mail your package"
            className="steps__option"
            onChange={() => setCheckMailPackage(!isCheckMailPackage)}
            checked={isCheckMailPackage}
          />
        </div>
        <div className="modal__btns">
          <Button
            size="medium-large"
            background="transparent"
            border="gradient"
            onClick={() => setIsStepsModalOpen(false)}
          >
            Close
          </Button>
          <Button
            size="medium-large"
            onClick={() => setIsStepsModalOpen(false)}
          >
            Shipment done
          </Button>
        </div>
      </Modal>
      <Modal
        isModalOpen={shippingFromForm}
        className="shipping__modal modal__form"
      >
        <h2 className="modal__title h2">New Shipping Form</h2>
        <div className="modal__text">
          Please provide the details required for the shipping label
        </div>
        <ShippingInfoForm
          data={{
            firstName,
            lastName,
          }}
          onSubmit={onShippingInfoFormSubmit}
          onCancel={() => setShippingFromForm(false)}
        />
        {spinner && <Loader />}
      </Modal>

      {currentShippingLabel && (
        <NewWindow
          url={currentShippingLabel}
          onUnload={() => setCurrentShippingLabel(null)}
        />
      )}
    </>
  );
};

export default SalesDetails;
