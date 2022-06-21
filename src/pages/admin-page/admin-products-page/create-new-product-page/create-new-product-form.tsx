import {
  Container, Box, TextField, Typography, Button,
} from '@mui/material';
import { useFormik, FormikConfig } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createNewProductAction } from '../../../../store/action-creators';
import { useRootDispatch } from '../../../../store/hooks';
import { CreateProduct } from '../../../../types/create-product';

type CreateConfig = FormikConfig<CreateProduct>;

const initialValues: CreateProduct = {
  images: '',
  title: '',
  price: '',
  description: '',
};

const validationSchema: Yup.SchemaOf<CreateProduct> = Yup.object({
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

const CreateNewProductForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useRootDispatch();

  const handleSubmitCreateProduct: CreateConfig['onSubmit'] = (values) => {
    dispatch(createNewProductAction(values));
    navigate('/admin/products');
  };

  const {
    values, handleSubmit, handleChange, handleBlur, touched, errors,
  } = useFormik<CreateProduct>({
    initialValues,
    onSubmit: handleSubmitCreateProduct,
    validationSchema,
  });

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
          color="black"
        >
          Create new product
        </Typography>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" type="submit">Create</Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={() => navigate('/admin/products')}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateNewProductForm;
