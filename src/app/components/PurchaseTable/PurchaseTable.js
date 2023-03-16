import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import moment from 'moment';
import { object, string, func } from 'prop-types';

import { useApi, useIntersectionObserver } from 'app/hooks';
import Discover from 'assets/svg/profile/discover.svg';
import { Button } from '../Common/Button/Button';
import Loader from '../Loader';
import PurchaseTableHeader from '../PurchaseTableHeader';
import EmptyState from '../EmptyState';
import PurchaseRow from '../PurchaseRow';
import './styles.scss';

export const PurchaseTable = ({
  apiFn,
  queryKey,
  emptyStateProps = {},
  seeDetails,
}) => {
  const history = useHistory();

  const { getPaymentCustomer, postPaymentCustomer } = useApi('payment');

  const {
    data: paymentCustomerPaidOrders,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryKey, ({ pageParam = 0 }) => apiFn(pageParam, 10), {
    getPreviousPageParam: firstPage => firstPage.previousId,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length - 1 : false,
  });

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const checkIsUserACustomer = async () => {
    try {
      await getPaymentCustomer();
    } catch (err) {
      await postPaymentCustomer();
    }
  };

  const returnHome = () => {
    history.push(`/`);
  };

  const ordersList = ({ id, createdAt, cashAmount }) => (
    <PurchaseRow
      key={`${id}-${createdAt}-${cashAmount}`}
      id={id}
      date={moment(createdAt).format('MMM DD, YYYY')}
      total={cashAmount}
      onClick={e => {
        e.stopPropagation();
        seeDetails(id);
      }}
    />
  );

  const pagesRender = (page, index) => (
    <React.Fragment key={page[0].id + index}>
      {page && page.length ? page.map(ordersList) : null}
    </React.Fragment>
  );

  const {
    title = `No order yet`,
    subtitle = '',
    btnIcon = Discover,
    buttonText = `Browse performances`,
    btnCallback = returnHome,
  } = emptyStateProps;

  useEffect(() => {
    checkIsUserACustomer();
  }, []);

  return (
    <>
      {paymentCustomerPaidOrders === undefined && <Loader />}
      {paymentCustomerPaidOrders &&
      paymentCustomerPaidOrders.pages[0].length ? (
        <>
          <table className="order-table">
            <thead>
              <PurchaseTableHeader />
            </thead>
            <tbody>{paymentCustomerPaidOrders.pages.map(pagesRender)}</tbody>
          </table>
          {hasNextPage && (
            <div ref={loadMoreButtonRef} className="loadmore-btn-container">
              <Button
                size="medium-large"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage && 'Loading more...'}
                {!isFetchingNextPage && hasNextPage
                  ? 'Load more'
                  : 'Nothing more to load'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="purchase-table-empty-state-wrap">
          <EmptyState
            title={title}
            subtitle={subtitle}
            btnIcon={btnIcon}
            buttonText={buttonText}
            onClick={btnCallback}
          />
        </div>
      )}
    </>
  );
};

PurchaseTable.propTypes = {
  apiFn: func,
  queryKey: string,
  emptyStateProps: object,
  seeDetails: func,
};

export default PurchaseTable;
