import {
  Alert,
  Box, Button, Container, Paper, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createDeleteProductAction, createfetchProductsAction, productsClearErrorAction,
} from '../../../store/action-creators';
import { useRootSelector, useRootDispatch } from '../../../store/hooks';
import { selectProducts, selectProductsLoading, selectProductsError } from '../../../store/selectors';
import ProductPageCard from './product-page-card';

const AdminProductPage: React.FC = () => {
  const navigate = useNavigate();
  const products = useRootSelector(selectProducts);
  const productsLoading = useRootSelector(selectProductsLoading);
  const error = useRootSelector(selectProductsError);
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(createfetchProductsAction);
  }, []);

  let pageContent = (
    <Box />
  );
  if (!productsLoading) {
    pageContent = products.length > 0 ? (
      <Box
        component="section"
        sx={{
          display: 'flex', gap: 5, mb: 6, flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {products.map((product) => (
          <Paper
            key={product.id}
            sx={{
              maxWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              background: '#C9E4C5',
            }}
          >
            <ProductPageCard
              {...product}
              deleteItem={() => dispatch(createDeleteProductAction(product.id))}
            />
          </Paper>
        ))}
      </Box>
    ) : <Typography component="h2" variant="h3" sx={{ my: 5 }}>No items, sorry.</Typography>;
  }

  return (
    <Container>
      <Box sx={{ my: 5 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin/products/create')}
        >
          Add new product
        </Button>

        <Button
          onClick={() => navigate('/admin')}
          variant="contained"
          color="error"
        >
          Back
        </Button>
      </Box>
      {error && (
        <Alert
          color="error"
          onClose={() => dispatch(productsClearErrorAction)}
        >
          {error}
        </Alert>
      )}
      {pageContent}
    </Container>
  );
};

export default AdminProductPage;
