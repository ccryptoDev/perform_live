import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MainSideBarView from './MainSidebarView';
import ExpandSidebar from '../ExpandSidebar';
import useApi from '../../../../../../hooks/api';
import SidebarCart from './Cart/SidebarCart/SidebarCart';
import './PerformanceSideBar.scss';
import CheckoutView from './Cart/CheckoutView/CheckoutView';
import OrderDetails from './Cart/OrderDetails/OrderDetails';
import numInRange from '../../../../../../utils/numInRange';
import useSidebarViewController from '../../hooks/useSidebarViewController';
import PayForGOSView from './GOS/PayForGOSView/PayForGOSView';
import GOSWaitingRoom from './GOS/GOSWaitingRoom/GOSWaitingRoom';
import GOSPaymentSuccess from './GOS/GOSPaymentSuccess';
import GiveAGiftView from './GiveAGiftView/GiveAGiftView';
import GiftSuccessView from './GiftSuccessView/GiftSuccessView';

const PerformanceSideBar = ({
  isExpand,
  performanceData,
  setFocusedProducts,
  focusedProducts,
  setExpandSidebar,
}) => {
  const queryClient = useQueryClient();
  const userInfo = useSelector(state => state.global.userInfo);
  const [
    currentSidebarView,
    setCurrentSidebarView,
  ] = useSidebarViewController();

  const {
    performer: { getPerformanceIdIdProduct },
    payment: {
      getPaymentCart,
      putPaymentCart,
      postPaymentPriceCustomerOrder,
      postPaymentPerformanceIdOrderInstant,
    },
  } = useApi();
  const { data: performanceProducts = [] } = useQuery(
    'performanceProducts',
    () => getPerformanceIdIdProduct(performanceData.id, { gallery: true }),
  );
  const performanceProductsHashMap = useMemo(
    () => performanceProducts.reduce((a, c) => ({ ...a, [c.id]: c }), {}),
    [performanceProducts],
  );

  const performerId = performanceData.performer.id;

  const [cartPrice, setCartPrice] = useState({});
  const [orderInfo, setOrderInfo] = useState(null);

  const refetchPrice = useMutation(postPaymentPriceCustomerOrder, {
    onSuccess: setCartPrice,
    onError: () => {
      setCartPrice({
        processing: 0,
        shipping: 0,
        subtotal: 0,
        total: 0,
      });
    },
  });

  const { data: cart = [] } = useQuery('cart', getPaymentCart, {
    onSuccess: cart => {
      refetchPrice.mutate({ items: cart });
    },
  });

  const updateCartApi = useMutation(putPaymentCart, {
    onMutate: async cart => {
      await queryClient.cancelQueries('cart');
      const prev = queryClient.getQueryData('cart');
      queryClient.setQueryData('cart', () => cart.items);

      return { prev };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData('cart', context.prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });

  const updateCartItems = items =>
    updateCartApi.mutate({
      performerId,
      items: items.filter(el => performanceProductsHashMap[el.productId]),
    });

  const addProductToCart = product => {
    setExpandSidebar(false);
    let existingProduct = false;
    const newData = cart.map(cartItem => {
      if (cartItem.productId === product.id) {
        cartItem.quantity += 1;
        existingProduct = true;
      }
      return cartItem;
    });
    const items = existingProduct
      ? newData
      : [...cart, { productId: product.id, quantity: 1 }];

    setCurrentSidebarView('cart');
    updateCartItems(items);
  };

  const removeProductFromCart = productId => {
    const items = cart.filter(el => el.productId !== productId);
    updateCartItems(items);
    queryClient.invalidateQueries('cartPrice');
  };

  const changeProductQuantityInCart = (productId, quantity) => {
    const items = cart.map(el => {
      if (el.productId === productId) {
        el.quantity = numInRange(1, el.stock, quantity);
      }
      return el;
    });
    updateCartItems(items);
  };

  const handleCloseCart = () => {
    setCurrentSidebarView('main');
  };

  const handleCheckout = () => {
    setCurrentSidebarView('checkout');
  };

  const handleOpenCart = () => {
    setCurrentSidebarView('cart');
  };
  window.handleOpenCart = handleOpenCart; // TODO refactor

  const handleCloseOrder = () => {
    setCurrentSidebarView('main');
    updateCartItems([]);
    setOrderInfo(null);
  };

  const cartWithFullproducts = cart
    .map(cartItem => ({
      ...cartItem,
      product: performanceProductsHashMap[cartItem.productId],
    }))
    .filter(el => el.product);

  const handlePay = async () => {
    const items = cartWithFullproducts.map(cartItem => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
    }));
    const res = await postPaymentPerformanceIdOrderInstant(performanceData.id, {
      items,
    });

    setOrderInfo(res);
  };

  const steps = {
    main: (
      <MainSideBarView
        isExpand={isExpand}
        setFocusedProducts={setFocusedProducts}
        focusedProducts={focusedProducts}
        performanceProducts={performanceProducts}
        addProductToCart={addProductToCart}
      />
    ),
    cart: (
      <SidebarCart
        cart={cartWithFullproducts}
        cartPrice={cartPrice}
        removeProduct={removeProductFromCart}
        changeProductQuantity={changeProductQuantityInCart}
        onClose={handleCloseCart}
        onCheckout={handleCheckout}
      />
    ),
    checkout: (
      <CheckoutView
        cartPrice={cartPrice}
        cart={cartWithFullproducts}
        performanceId={performanceData.id}
        onBack={handleOpenCart}
        setCurrentSidebarView={setCurrentSidebarView}
        handlePay={handlePay}
      />
    ),
    orderDetails: (
      <OrderDetails
        cartPrice={cartPrice}
        cart={cartWithFullproducts}
        onClose={handleCloseOrder}
        orderInfo={orderInfo}
        performanceData={performanceData}
      />
    ),
    payJoinStage: (
      <PayForGOSView
        performanceData={performanceData}
        setCurrentSidebarView={setCurrentSidebarView}
      />
    ),
    gosWaitingRoom: (
      <GOSWaitingRoom
        userInfo={userInfo}
        performanceData={performanceData}
        setCurrentSidebarView={setCurrentSidebarView}
      />
    ),
    gosSuccess: (
      <GOSPaymentSuccess
        performanceData={performanceData}
        setCurrentSidebarView={setCurrentSidebarView}
      />
    ),
    gift: (
      <GiveAGiftView
        performanceId={performanceData.id}
        handleViewChange={setCurrentSidebarView}
        performanceData={performanceData}
      />
    ),
    giftSuccess: (
      <GiftSuccessView
        performance={performanceData}
        handleViewChange={setCurrentSidebarView}
      />
    ),
  };
  return (
    <>
      <div className={isExpand ? 'side-bar active' : 'side-bar'}>
        {steps[currentSidebarView]}{' '}
      </div>

      {!!isExpand && (
        <ExpandSidebar
          focusedProducts={focusedProducts}
          products={performanceProducts}
          addProductToCart={addProductToCart}
        />
      )}
    </>
  );
};

PerformanceSideBar.propTypes = {};

export default PerformanceSideBar;
