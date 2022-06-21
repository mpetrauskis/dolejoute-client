import React from 'react';
import {
  Box, Container, Typography,
} from '@mui/material';
import Img from '../../components/image';

const HomePage: React.FC = () => (
  <Container sx={{ my: 5 }}>
    <Box sx={{ display: 'flex' }}>
      <Box sx={{
        display: 'flex',
        alingItems: 'center',
        justifyContent: 'center',
        my: 10,
      }}
      >
        <Typography
          component="h1"
          variant="h2"
          fontSize={65}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 10,
          }}
        >
          Hello!
          {' '}
          <br />
          {' '}
          {' '}
          <br />
          {' '}
          And Welcome to my handcrafted jewellery gallery.
        </Typography>
      </Box>
      <Box sx={{
        my: 10,
        borderRadius: '100%',
      }}
      >
        <Box>
          <Img
            sx={{
              borderRadius: '100%',
              maxWidth: 200,
            }}
            alt=""
            src="https://i.etsystatic.com/26900038/r/il/728683/2954168932/il_794xN.2954168932_mpta.jpg"
          />
          <Img
            sx={{
              borderRadius: '100%',
              maxWidth: 200,
            }}
            alt=""
            src="https://i.etsystatic.com/26900038/r/il/174504/3144218807/il_794xN.3144218807_rk1h.jpg?w=248&fit=crop&auto=format&dpr=2"
          />
          <Img
            sx={{
              borderRadius: '100%',
              maxWidth: 200,
            }}
            alt=""
            src="https://i.etsystatic.com/26900038/r/il/252968/2954052210/il_794xN.2954052210_3rjj.jpg?w=248&fit=crop&auto=format&dpr=2"
          />
        </Box>
        <Box />
      </Box>
    </Box>
    <Box>
      <Typography variant="h5">
        All of the rings are custom made and can be modified.Before ordering make sure that the measurements are accurate.I would highly suggest you visit jeweler to measure your ring size, as in case if sizing is wrong, I will not be able to change or refund your order.
      </Typography>
    </Box>
  </Container>
);

export default HomePage;
