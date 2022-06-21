import { Dispatch } from 'react';
import { AppAction, RootState } from '../../types';
import {
  OrdersAction,
  OrderActionType,
} from './orders-types';
import { Order } from '../../../types/order';
import { CreateOrder } from '../../../types/create-order';
import OrderService from '../../../services/orders-service';

export const createfetchOrdersLoadingAction: OrdersAction = ({
  type: OrderActionType.FETCH_ORDERS_LOADING,
});

export const createFecthOrdersSuccessAction = (orders: Order[]): OrdersAction => ({
  type: OrderActionType.FETCH_ORDERS_SUCCESS,
  payload: { orders },
});

export const createFecthOrdersFailureAction = (error: string): OrdersAction => ({
  type: OrderActionType.FETCH_ORDERS_FAILURE,
  payload: { error },
});

export const ordersClearErrorAction: OrdersAction = ({
  type: OrderActionType.ORDERS_CLEAR_ERROR,
});

export const createfetchOrdersAction = async (dispatch: Dispatch<AppAction>) => {
  dispatch(createfetchOrdersLoadingAction);
  try {
    const ordersItems = await OrderService.fetchOrders();
    dispatch(createFecthOrdersSuccessAction(ordersItems));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const fecthOrdersFailureAction = createFecthOrdersFailureAction(errMsg);
    dispatch(fecthOrdersFailureAction);
  }
};

export const createNewOrderAction = (order: CreateOrder) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Reikalingas prisijungimas');
  }
  await OrderService.createNewOrder(order);
  createfetchOrdersAction(dispatch);
};

export const createDeleteOrderAction = (id: string) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Reikalingas prisijungimas');
  }
  await OrderService.deleteOrder(id, token);
  createfetchOrdersAction(dispatch);
};
