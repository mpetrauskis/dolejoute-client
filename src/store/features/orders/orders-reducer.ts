/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'react';
import {
  OrdersAction,
  OrdersState,
  OrderActionType,
} from './orders-types';

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersReducer: Reducer<OrdersState, OrdersAction> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionType.FETCH_ORDERS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case OrderActionType.FETCH_ORDERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    }
    case OrderActionType.FETCH_ORDERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case OrderActionType.ORDERS_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: return state;
  }
};
export default ordersReducer;
