/**
 *
 * ShipingFrom actions
 *
 */

import { ActionTypes } from './shippingFrom.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}
