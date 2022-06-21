import { combineReducers } from 'redux';
import authReducer from './features/auth/auth-reducer';
import navigationReducer from './features/navigation/navigation-reducer';
import productsReducer from './features/products/products-reducer';
import ordersReducer from './features/orders/orders-reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  navigation: navigationReducer,
  products: productsReducer,
});

export default mainReducer;
