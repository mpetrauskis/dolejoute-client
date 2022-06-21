import { RootState } from '../../types';

export const selectProductsLoading = (state: RootState) => state.products.loading;

export const selectProducts = (state: RootState) => state.products.products;

export const selectProductById = (id?: string) => (state: RootState) => (id
  ? state.products.products.find((product: { id: string; }) => id === product.id)
  : undefined);

export const selectProductsError = (state: RootState) => state.products.error;
