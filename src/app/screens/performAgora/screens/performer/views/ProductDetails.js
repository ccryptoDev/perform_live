import { checkPropTypes } from 'prop-types';
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import _get from 'lodash/get';
import '../../../../../styles/products.scss';
import { IMG } from '../performer.dependencies';
import AddProducts from '../../../../performanceScheduler/screens/addProducts';
import { updateCurrentSettingComponent } from '../state/performer.actions';
import Button from '../../../../../components/Common/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';
import { getPerformanceProducts } from '../../../../productManagement/state/productManagement.actions';

import { firebaseClient } from '../../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { useQueryClient } from 'react-query';

const ProductDetails = ({ isModal, performanceData }) => {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { id: performanceId } = useParams();
  const performanceProducts = useSelector(state =>
    _get(state, 'productmanagement.performanceProducts', []),
  );
  const queryClient = useQueryClient();

  const channelMessageRef = `channel_events/${
    firebaseClient._channel
  }/channelMessage`;
  const handleBack = () => {
    const component = 'greenroom';
    dispatch(updateCurrentSettingComponent({ component }));
    // refresh product list
    const payload = {
      paramsToReplace: { id: performanceId },
      queryPrams: { gallery: true },
    };
    queryClient.invalidateQueries('performanceProducts');

    // dispatch(getPerformanceProducts(payload));

    // dispach firebase action to audience end to update their product list
    const data = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.REFRESH_PRODUCT_LIST,

      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.pushData(channelMessageRef, data);
  };

  useEffect(
    () => {
      const products = performanceProducts.map(product => product.id);
      if (!selectedProducts.length && products.length)
        setSelectedProducts(products);
    },
    [performanceProducts],
  );
  return (
    <div className={isModal ? 'products-details active' : 'products-details'}>
      <div className="check-layout">
        <div className="card__wrapper card-product">
          <img
            src={IMG.BACK_BTN}
            className="back-btn"
            alt="back"
            onClick={() => handleBack()}
            role="none"
          />
          <Button
            size="default"
            background="glassy-white"
            className="circle-btn"
            onClick={() => handleBack()}
            suffix={<img src={CloseIcon} alt="close icon" />}
          />
          <AddProducts
            selectedProducts={selectedProducts}
            from="livePerformance"
            performanceData={performanceData}
          />
          <Button
            size="large"
            onClick={() => handleBack()}
            className="save-btn"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetails);
