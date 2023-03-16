/**
 *
 * PaymentShipping actions
 *
 */

import { ActionTypes } from './paymentShipping.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}
