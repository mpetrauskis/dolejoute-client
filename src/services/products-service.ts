import { Product } from '../types/product';
import { CreateProduct } from '../types/create-product';
import ApiService, { formatError } from './api-service';

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await ApiService.get<{ products: Product[] }>('/api/products/');
    return data.products;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const deleteProduct = async (id: string, token: string) => {
  try {
    const { data } = await ApiService.delete<{ product: Product }>(`/api/products/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data.product;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const createNewProduct = async (product: CreateProduct, token: string) => {
  try {
    const { data } = await ApiService.post<{ product: Product }>(
      'api/products/',
      product,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return data.product;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const updateProduct = async (product: Product, token: string) => {
  try {
    const { data } = await ApiService.patch<{ product: Product }>(
      `api/products/${product.id}`,
      {
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return data.product;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const ProductService = {
  fetchProducts,
  deleteProduct,
  createNewProduct,
  updateProduct,
};

export default ProductService;
