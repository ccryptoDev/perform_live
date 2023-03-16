import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useApi } from 'app/hooks';

import { ScrollTop } from '../../components';
import ScreenWrap from '../../components/ScreenWrap';
import PurchaseTable from '../../components/PurchaseTable';
import Tabs from '../../components/Tabs';

import './purchase.scss';

export const Purchase = () => {
  const history = useHistory();
  const [tab, setTab] = useState(0);

  const { getPaymentCustomerPaidOrder, getPaymentCustomerPaidDigital } = useApi(
    'payment',
  );

  const purchaseTableProps = tabValue =>
    ({
      0: { apiFn: getPaymentCustomerPaidOrder, queryKey: 'paidOrders' },
      1: { apiFn: getPaymentCustomerPaidDigital, queryKey: 'paidDigitals' },
    }[tabValue]);

  const seePurchseDetails = orderId => history.push(`/purchase/${orderId}`);

  const emptyStateBtnCallback = () => history.push(`/`);

  const emptyStateProps = {
    0: {
      title: `No products yet`,
      subtitle: `Join the performance for live shopping!`,
      buttonText: `Browse performances`,
      btnCallback: emptyStateBtnCallback,
    },
    1: {
      title: `No transactions yet`,
      subtitle: `Join the performance for live shopping!`,
      buttonText: `Browse performances`,
      btnCallback: emptyStateBtnCallback,
    },
  };

  return (
    <>
      <ScreenWrap cardTitle="Purchase">
        <Tabs
          activeTab={tab}
          onTabClick={setTab}
          tabs={[{ name: 'Products' }, { name: 'Transactions' }]}
        />
        <PurchaseTable
          {...purchaseTableProps(tab)}
          seeDetails={seePurchseDetails}
          emptyStateProps={emptyStateProps[tab]}
        />
      </ScreenWrap>
      <ScrollTop />
    </>
  );
};

export default Purchase;
