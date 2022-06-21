import { ThunkDispatch } from 'redux-thunk';
import { AuthState, AuthAction } from './features/auth/auth-types';
import { NavigationState, NavigationAction } from './features/navigation/navigation-types';
import { ProductsState, ProductsAction } from './features/products/products-types';
import { OrdersState, OrdersAction } from './features/orders/orders-types';

export type RootState = {
  auth: AuthState,
  navigation: NavigationState,
  products: ProductsState,
  orders: OrdersState,
};

export type AppAction = AuthAction | NavigationAction | ProductsAction | OrdersAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;
