import React from 'react';
import { useFormik } from 'formik';
import {
  Typography,
  Container,
  Box,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthUser } from '../../store/selectors';
import { createOrderActionThunk } from '../../store/action-creators';

type UserOrder = {
  email?: string,
  orderPrice: string,
  orderDescription?: string,
  images?: string,
};

type UserOrderFormikValues = {
  emailInit: string,
  email: string,
};

const OrderPage: React.FC = () => {
  const user = useRootSelector(selectAuthUser);
  const dispatch = useRootDispatch();
  if (user === null) throw new Error('Needed Authorization');

  const createOrder = () => {
    const userOrder: UserOrder = {
      email: '',
      orderPrice: '',
      orderDescription: '',
    };
    if (Object.keys(userOrder).length > 0) {
      const formData = new FormData();
      Object.entries(userOrder).forEach(([key, value]) => {
        formData.set(key, value);
      });
      dispatch(createOrderActionThunk(formData));
    }
  };

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<UserOrderFormikValues>({
    initialValues: {
      emailInit: user.email,
      email: user.email,
    },
    onSubmit: createOrder,
  });

  return (
    <Container>
      <Paper sx={{
        my: 5,
        p: 3,
        display: 'flex',
        gap: 3,
        background: '#C9E4C5',
      }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flexGrow: 1,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>Custom order details</Typography>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={values.email}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            disabled
          />
          <TextField
            name="orderPrice"
            label="Price range"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="images"
            label="Your image URL of whanted ring"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="orderDescription"
            label="Your ring description"
            multiline
            rows={16}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            variant="contained"
            sx={{ alignSelf: 'center  ', mt: 3 }}
            size="large"
            type="submit"
          >
            Compleate order!
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderPage;
