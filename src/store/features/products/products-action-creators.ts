import { Dispatch } from 'react';
import { AppAction, RootState } from '../../types';
import {
  ProductsAction,
  ProductActionType,
} from './products-types';
import { Product } from '../../../types/product';
import { CreateProduct } from '../../../types/create-product';
import ProductService from '../../../services/products-service';

export const createfetchProductsLoadingAction: ProductsAction = ({
  type: ProductActionType.FETCH_PRODUCTS_LOADING,
});

export const createFecthProductsSuccessAction = (products: Product[]): ProductsAction => ({
  type: ProductActionType.FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const createFecthProductsFailureAction = (error: string): ProductsAction => ({
  type: ProductActionType.FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const productsClearErrorAction: ProductsAction = ({
  type: ProductActionType.PRODUCTS_CLEAR_ERROR,
});

export const createfetchProductsAction = async (dispatch: Dispatch<AppAction>) => {
  dispatch(createfetchProductsLoadingAction);
  try {
    const productsItems = await ProductService.fetchProducts();
    dispatch(createFecthProductsSuccessAction(productsItems));
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const fecthProductsFailureAction = createFecthProductsFailureAction(errMsg);
    dispatch(fecthProductsFailureAction);
  }
};

export const createNewProductAction = (product: CreateProduct) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Reikalingas prisijungimas');
  }
  await ProductService.createNewProduct(product, token);
  createfetchProductsAction(dispatch);
};

export const createUpdateProductAction = (product: Product) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Reikalingas prisijungimas');
  }
  await ProductService.updateProduct(product, token);
  createfetchProductsAction(dispatch);
};

export const createDeleteProductAction = (id: string) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Reikalingas prisijungimas');
  }
  await ProductService.deleteProduct(id, token);
  createfetchProductsAction(dispatch);
};
