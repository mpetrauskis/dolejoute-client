/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'react';
import {
  ProductsAction,
  ProductsState,
  ProductActionType,
} from './products-types';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsReducer: Reducer<ProductsState, ProductsAction> = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionType.FETCH_PRODUCTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ProductActionType.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    }
    case ProductActionType.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case ProductActionType.PRODUCTS_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: return state;
  }
};
export default productsReducer;
