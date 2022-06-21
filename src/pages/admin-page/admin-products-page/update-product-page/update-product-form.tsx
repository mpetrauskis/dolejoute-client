import {
  Container, Box, TextField, Typography, Button,
} from '@mui/material';
import { useFormik, FormikConfig } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { createfetchProductsAction, createUpdateProductAction } from '../../../../store/action-creators';
import { useRootDispatch, useRootSelector } from '../../../../store/hooks';
import { Product } from '../../../../types/product';
import { selectProductById, selectProductsLoading } from '../../../../store/features/products/products-selectors';

type CreateConfig = FormikConfig<Product>;

const validationSchema = Yup.object({
  title: Yup.string()
    .required('This field is Required'),
  price: Yup.string()
    .matches(/^[0-9]*$/, 'Only numbers is alowed')
    .required('This field is Required'),
  description: Yup.string()
    .required('This field is Required'),
  images: Yup.string()
    .required('This field is Required')
    .matches(/https?:\/\/(www\.)?/, 'Enter correct url'),
});

const UpdateProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  const product = useRootSelector(selectProductById(id));
  const loading = useRootSelector(selectProductsLoading);
  const [hasPrefilled, setHasPrefilled] = useState(!!product);

  const initialValues = product || {
    id: '',
    images: '',
    title: '',
    price: '',
    description: '',
  };

  const handleSubmitUpdateProduct: CreateConfig['onSubmit'] = (values) => {
    dispatch(createUpdateProductAction(values));
    navigate('/admin/products');
  };

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
  } = useFormik<Product>({
    initialValues,
    onSubmit: handleSubmitUpdateProduct,
    validationSchema,
  });

  useEffect(() => {
    if (!loading && !hasPrefilled) {
      if (product) { setValues(product); }
      setHasPrefilled(true);
    }
  }, [loading, product]);

  useEffect(() => {
    dispatch(createfetchProductsAction);
  }, []);

  return (
    <Container
      sx={{
        py: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          px: 4,
          py: 3,
          background: '#C9E4C5',
          boxShadow: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
        >
          Update product
        </Typography>
        <TextField
          name="id"
          type="text"
          label="Product ID"
          value={values.id}
          variant="outlined"
          fullWidth
          disabled
          sx={{ mt: 3 }}
        />
        <TextField
          name="title"
          type="text"
          label="Title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        />
        <Typography sx={{
          fontSize: 12, color: 'red', mt: 1, ml: 1,
        }}
        >
          {touched.title && errors.title}
        </Typography>
        <TextField
          name="price"
          type="text"
          label="Price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        />
        <Typography sx={{
          fontSize: 12, color: 'red', mt: 1, ml: 1,
        }}
        >
          {touched.price && errors.price}
        </Typography>
        <TextField
          name="description"
          type="text"
          label="Description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        />
        <Typography sx={{
          fontSize: 12, color: 'red', mt: 1, ml: 1,
        }}
        >
          {touched.description && errors.description}
        </Typography>
        <TextField
          name="images"
          type="text"
          label="Image"
          value={values.images}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        />
        <Typography sx={{
          fontSize: 12, color: 'red', mt: 1, ml: 1,
        }}
        >
          {touched.images && errors.images}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" type="submit">Update</Button>
          <Button
            color="error"
            variant="contained"
            type="button"
            onClick={() => navigate('/admin/products')}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateProductForm;
