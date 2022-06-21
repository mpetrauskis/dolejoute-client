import { Order } from '../../../types/order';

export type OrdersState = {
  orders: Order[],
  loading: boolean,
  error: string | null,
};

export enum OrderActionType {
  FETCH_ORDERS_LOADING = 'FETCH_ORDERS_LOADING',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE',
  ORDERS_CLEAR_ERROR = 'ORDERS_CLEAR_ERROR',
}

export type FetchOrdersLoadingAction = {
  type: OrderActionType.FETCH_ORDERS_LOADING,
};

export type FetchOrdersSuccessAction = {
  type: OrderActionType.FETCH_ORDERS_SUCCESS,
  payload: {
    orders: Order[],
  }
};
export type FetchOrdersFailureAction = {
  type: OrderActionType.FETCH_ORDERS_FAILURE,
  payload: {
    error: string,
  }
};

export type OrdersClearErrorAction = {
  type: OrderActionType.ORDERS_CLEAR_ERROR,
};

export type OrdersAction =
  FetchOrdersLoadingAction |
  FetchOrdersSuccessAction |
  FetchOrdersFailureAction |
  OrdersClearErrorAction;
