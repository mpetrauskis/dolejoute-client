import React from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { selectAuthError, selectAuthLoggedIn } from '../store/selectors';
import { useRootDispatch, useRootSelector } from '../store/hooks';
import { authClearErrorAction } from '../store/action-creators';

type AuthFormProps = {
  formTitle: string,
  submitText: string,
  btnActive?: boolean,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

const contentWidth = 400;

const AuthForm: React.FC<AuthFormProps> = ({
  formTitle,
  submitText,
  btnActive = true,
  onSubmit,
  children,
}) => {
  const dispatch = useRootDispatch();
  const loading = useRootSelector(selectAuthLoggedIn);
  const error = useRootSelector(selectAuthError);
  const clearError = () => {
    dispatch(authClearErrorAction);
  };
  return (
    <Container sx={{ position: 'relative', pt: 20 }}>
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert
            sx={{
              position: 'absolute',
              top: 0,
              minWidth: contentWidth,
              mt: 12,
            }}
            color="error"
            onClose={clearError}
          >
            {error}
          </Alert>
        </Box>
      )}
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
          width: contentWidth,
          background: '#C9E4C5',
        }}
        onSubmit={onSubmit}
      >
        <SecurityIcon color="primary" sx={{ fontSize: 45 }} />
        <Typography component="h1" variant="h4">{formTitle}</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 1 / 1,
          my: 2,
        }}
        >
          {children}
        </Box>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!btnActive || loading}
          sx={{ width: 120, height: 45 }}
        >
          {loading ? <CircularProgress size={25} /> : submitText}
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthForm;
