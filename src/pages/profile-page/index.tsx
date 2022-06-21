import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import validator from 'validator';
import * as Yup from 'yup';
import {
  Typography,
  Container,
  Box,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import Img from '../../components/image';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthUser } from '../../store/selectors';
import AuthService from '../../services/auth-service';
import { createAuthUserUpdateActionThunk } from '../../store/action-creators';

type UserUpdateFormikValues = {
  emailInit: string,
  email: string,
  name: string,
  surname: string,
};

type UserUpdate = {
  email?: string,
  name?: string,
  surname?: string,
  img?: File,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Required')
    .test(
      'emailAvailabilityCheck',
      'Email is not valid',
      async (email, context) => {
        if (email === context.parent.emailInit) return true;
        if (!email) return false;
        if (!validator.isEmail(email)) return false;
        try {
          const emailIsAvailable = await AuthService.checkEmailAvailability(email);
          return emailIsAvailable;
        } catch (error) {
          throw context.createError({
            message: error instanceof Error ? error.message : error as string,
          });
        }
      },
    ),
  name: Yup.string()
    .min(2, 'min 2 raidės')
    .max(16, 'max 16 raidžių'),
  surname: Yup.string()
    .min(2, 'min 2 raidės')
    .max(16, 'max 16 raidžių'),
});

const ProfilePage: React.FC = () => {
  const user = useRootSelector(selectAuthUser);
  const dispatch = useRootDispatch();
  const imageFieldRef = useRef<HTMLInputElement>(null);
  const [uploadedImgSrc, setUploadedImgSrc] = useState<null | string>(null);

  if (user === null) throw new Error('Needed Authorization');

  const updateUser = (values: UserUpdateFormikValues) => {
    const userUpdate: UserUpdate = {};

    Object.entries(values).forEach(([key, value]) => {
      const valueKey = key as keyof UserUpdateFormikValues;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const valueHasChanged = initialValues[valueKey] !== value;
      if (valueHasChanged) {
        userUpdate[valueKey as keyof Omit<UserUpdate, 'img'>] = value;
      }
    });

    if (imageFieldRef?.current?.files && imageFieldRef.current.files[0]) {
      userUpdate.img = imageFieldRef.current.files[0] as File;
    }
    if (Object.keys(userUpdate).length > 0) {
      const formData = new FormData();
      Object.entries(userUpdate).forEach(([key, value]) => {
        formData.set(key, value);
      });
      dispatch(createAuthUserUpdateActionThunk(formData));
    }
  };

  const uploadImage = () => {
    const input = imageFieldRef.current as HTMLInputElement;
    input.click();
  };

  const imageHasUploaded = async () => {
    if (imageFieldRef?.current?.files && imageFieldRef.current.files[0]) {
      const imgFile = imageFieldRef.current?.files[0] as File;
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const imgDataUrl = fileReader.result as string;
        setUploadedImgSrc(imgDataUrl);
      };
      fileReader.readAsDataURL(imgFile);
    }
  };

  const {
    initialValues,
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<UserUpdateFormikValues>({
    initialValues: {
      emailInit: user.email,
      email: user.email,
      name: user.name ?? '',
      surname: user.surname ?? '',
    },
    onSubmit: updateUser,
    validationSchema,
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
          <Typography variant="h4" sx={{ mb: 2 }}>User information</Typography>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="surname"
            label="Surname"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.surname && !!errors.surname}
            helperText={touched.surname && errors.surname}
          />
          <Button
            variant="contained"
            sx={{ alignSelf: 'center  ', mt: 3 }}
            size="large"
            type="submit"
          >
            Update user
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Img src={uploadedImgSrc ?? user.img ?? '/no-image.jpg'} sx={{ display: 'block', width: 300, height: 300 }} />
          <Button sx={{ mt: 2 }} variant="contained" onClick={uploadImage}>Upload foto</Button>
          <TextField
            type="file"
            sx={{ display: 'none' }}
            inputRef={imageFieldRef}
            inputProps={{
              accept: 'image/png, image/jpeg',
            }}
            onChange={imageHasUploaded}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
