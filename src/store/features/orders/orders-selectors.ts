import { RootState } from '../../types';

export const selectOrdersLoading = (state: RootState) => state.orders.loading;

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectOrderById = (id?: string) => (state: RootState) => (id
  ? state.orders.orders.find((orders: { id: string; }) => id === orders.id)
  : undefined);

export const selectOrdersError = (state: RootState) => state.orders.error;
