import { Product } from '../../../types/product';

export type ProductsState = {
  products: Product[],
  loading: boolean,
  error: string | null,
};

export enum ProductActionType {
  FETCH_PRODUCTS_LOADING = 'FETCH_PRODUCTS_LOADING',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  PRODUCTS_CLEAR_ERROR = 'PRODUCTS_CLEAR_ERROR',
}

export type FetchProductsLoadingAction = {
  type: ProductActionType.FETCH_PRODUCTS_LOADING,
};

export type FetchProductsSuccessAction = {
  type: ProductActionType.FETCH_PRODUCTS_SUCCESS,
  payload: {
    products: Product[],
  }
};
export type FetchProductsFailureAction = {
  type: ProductActionType.FETCH_PRODUCTS_FAILURE,
  payload: {
    error: string,
  }
};

export type ProductsClearErrorAction = {
  type: ProductActionType.PRODUCTS_CLEAR_ERROR,
};
export type ProductsAction =
  FetchProductsLoadingAction |
  FetchProductsSuccessAction |
  FetchProductsFailureAction |
  ProductsClearErrorAction;
