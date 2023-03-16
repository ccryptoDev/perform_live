import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Plus from '../../../assets/svg/plus.svg';
import { useApi } from '../../hooks/api';
import ScreenWrap from '../../components/ScreenWrap';
import PurchaseTable from '../../components/PurchaseTable';
import ScrollTop from '../../components/ScrollTop';
import Tabs from '../../components/Tabs';

import './sales.scss';

export const Sales = () => {
  const history = useHistory();
  const [tab, setTab] = useState(0);

  const {
    getPaymentPerformerPaidOrder,
    getPaymentPerformerPaidDigital,
  } = useApi('payment');

  const purchaseTableProps = tabValue =>
    ({
      0: { apiFn: getPaymentPerformerPaidOrder, queryKey: 'salesOrders' },
      1: { apiFn: getPaymentPerformerPaidDigital, queryKey: 'salesDigitals' },
    }[tabValue]);

  const emptyStateBtnCallback = () =>
    history.push(`/performancescheduler?type=sale`);

  const emptyStateProps = {
    0: {
      title: `No products yet`,
      subtitle: `Create a performance to sell your products!`,
      btnIcon: Plus,
      buttonText: `New performances`,
      btnCallback: emptyStateBtnCallback,
    },
    1: {
      title: `No transactions yet`,
      subtitle: `Create a performance to sell your products!`,
      btnIcon: Plus,
      buttonText: `New performances`,
      btnCallback: emptyStateBtnCallback,
    },
  };

  const seeSalesDetails = orderId => history.push(`/sales/${orderId}`);

  return (
    <>
      <ScreenWrap cardTitle="Sales">
        <Tabs
          activeTab={tab}
          onTabClick={setTab}
          tabs={[{ name: 'Products' }, { name: 'Transactions' }]}
        />
        <PurchaseTable
          {...purchaseTableProps(tab)}
          seeDetails={seeSalesDetails}
          emptyStateProps={emptyStateProps[tab]}
        />
      </ScreenWrap>
      <ScrollTop />
    </>
  );
};

export default Sales;
