import { Order } from '../types/order';
import { CreateOrder } from '../types/create-order';
import ApiService, { formatError } from './api-service';

const fetchOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await ApiService.get<{ orders: Order[] }>('/api/order');
    return data.orders;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const deleteOrder = async (id: string, token: string) => {
  try {
    const { data } = await ApiService.delete<{ order: Order }>(`/api/order/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data.order;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const createNewOrder = async (order: CreateOrder) => {
  try {
    const { data } = await ApiService.post<{ order: Order }>(
      'api/order/',
      order,
    );
    return data.order;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const OrderService = {
  fetchOrders,
  deleteOrder,
  createNewOrder,
};

export default OrderService;
