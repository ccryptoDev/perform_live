import { AbstractApiService } from './abstract-service';

export default class PaymentService extends AbstractApiService {
  getPaymentCart = () =>
    this.api.get(`/payment/cart`).then(res => res.performersOrders[0].items);

  putPaymentCart = body =>
    this.api.put(`/payment/cart`, { performersOrders: [body] });

  getPaymentCustomerPaid = () => this.api.get(`/payment/customer/paid`);

  getPaymentCustomerPaidOrder = (pageParam, quantity = 10) => {
    const queryParams =
      pageParam || pageParam === 0
        ? { params: { page: pageParam, size: quantity } }
        : {};

    return this.api.get(`/payment/customer/paid/order`, queryParams);
  };

  getPaymentCustomerPaidDigital = () =>
    this.api.get(`/payment/customer/paid/digital`);

  getPaymentCustomerPaidIdId = id =>
    this.api.get(`/payment/customer/paid/id/${id}`);

  getPaymentCustomerShipmentLabelLabelIdTrack = labelId =>
    this.api.get(`/payment/customer/shipment/label/${labelId}/track`);

  postPaymentCustomer = body => this.api.post(`/payment/customer`, body);

  getPaymentCustomer = () => this.api.get(`/payment/customer`);

  postPaymentCustomerPaymentMethod = body =>
    this.api.post(`/payment/customer/paymentMethod`, body);

  getPaymentCustomerPaymentMethod = () =>
    this.api.get(`/payment/customer/paymentMethod`);

  postPaymentCustomerPaymentMethodCard = body =>
    this.api.post(`/payment/customer/paymentMethod/card`, body);

  deletePaymentCustomerPaymentMethodIdId = (id, body) =>
    this.api.delete(`/payment/customer/paymentMethod/id/${id}`, body);

  putPaymentCustomerPaymentMethodIdIdDefault = (id, body) =>
    this.api.put(`/payment/customer/paymentMethod/id/${id}/default`, body);

  postPaymentCustomerShipping = body =>
    this.api.post(`/payment/customer/shipping`, body);

  getPaymentCustomerShipping = () => this.api.get(`/payment/customer/shipping`);

  putPaymentCustomerShipping = body =>
    this.api.put(`/payment/customer/shipping`, body);

  postPaymentCustomerSource = body =>
    this.api.post(`/payment/customer/source`, body);

  getPaymentCustomerSource = () => this.api.get(`/payment/customer/source`);

  deletePaymentCustomerSource = body =>
    this.api.delete(`/payment/customer/source`, body);

  postPaymentCustomerSourcePayout = body =>
    this.api.post(`/payment/customer/source/payout`, body);

  postPaymentPerformanceIdOrderIntent = (id, body) =>
    this.api.post(`/payment/performance/${id}/order/intent`, body);

  postPaymentPerformanceIdOrderInstant = (id, body) =>
    this.api.post(`/payment/performance/${id}/order/instant`, body);

  postPaymentPerformanceIdPaymentForIntent = (id, paymentFor, body) =>
    this.api.post(`/payment/performance/${id}/${paymentFor}/intent`, body);

  postPaymentPerformanceIdPaymentForCheckout = (id, paymentFor, body) =>
    this.api.post(`/payment/performance/${id}/${paymentFor}/checkout`, body);

  postPaymentPerformanceIdPaymentForInstant = (id, paymentFor, params) =>
    this.api.post(`/payment/performance/${id}/${paymentFor}/instant`, null, {
      params,
    });

  postPaymentPerformanceIdPaymentForApple = (id, paymentFor, body) =>
    this.api.post(`/payment/performance/${id}/${paymentFor}/apple`, body);

  postPaymentPerformanceIdPaymentForGoogle = (id, paymentFor, body) =>
    this.api.post(`/payment/performance/${id}/${paymentFor}/google`, body);

  getPaymentPerformerPaid = () => this.api.get(`/payment/performer/paid`);

  getPaymentPerformerPaidOrder = () =>
    this.api.get(`/payment/performer/paid/order`);

  getPaymentPerformerPaidDigital = () =>
    this.api.get(`/payment/performer/paid/digital`);

  getPaymentPerformerPaidIdId = id =>
    this.api.get(`/payment/performer/paid/id/${id}`);

  getPaymentPerformerPaidEarnings = () =>
    this.api.get(`/payment/performer/paid/earnings`);

  postPaymentPerformerShipping = body =>
    this.api.post(`/payment/performer/shipping`, body);

  getPaymentPerformerShipping = () =>
    this.api.get(`/payment/performer/shipping`);

  putPaymentPerformerShipping = body =>
    this.api.put(`/payment/performer/shipping`, body);

  postPaymentPerformerShipmentLabelPaymentId = paymentId =>
    this.api.post(`/payment/performer/paid/id/${paymentId}/label`);

  getPaymentPerformerShipmentLabelLabelIdTrack = labelId =>
    this.api.get(`/payment/performer/shipment/label/${labelId}/track`);

  postPaymentPriceCustomerOrder = (body, params) =>
    this.api.post(`/payment/price/customer/order`, body, { params });

  postPaymentPricePerformerOrder = (body, params) =>
    this.api.post(`/payment/price/performer/order`, body, { params });

  postPaymentPriceCustomerDigital = (body, params) =>
    this.api.post(`/payment/price/customer/digital`, body, { params });

  postPaymentPricePerformerDigital = (body, params) =>
    this.api.post(`/payment/price/performer/digital`, body, { params });

  getPaymentPriceProduct = price =>
    this.api.get(`/payment/price/product`, { params: { earn: price } });

  getPaymentPriceEarn = price =>
    this.api.get(`/payment/price/earn`, { params: { product: price } });

  postPaymentShipengineTrack = body =>
    this.api.post(`/payment/shipengine/track`, body);

  getPaymentPerformerShipping = () =>
    this.api.get(`/payment/performer/shipping`);

  getRedemptionHistory = () => this.api.get('/payment/performer/paid/payout');

  postPaymentSourcePayout = body =>
    this.api.post('/payment/customer/source/payout', body);
}
