import React, { useEffect } from 'react';
import {
  Stack,
  ImageList,
  Box,
  Container,
} from '@mui/material';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { createfetchProductsAction } from '../../store/action-creators';
import { selectProducts } from '../../store/features/products/products-selectors';
import GalleryPageCard from './gallery-page-card';

const GalleryPage: React.FC = () => {
  const products = useRootSelector(selectProducts);
  const dispatch = useRootDispatch();
  useEffect(() => {
    dispatch(createfetchProductsAction);
  }, []);
  return (

    <Container sx={{ pt: 6 }}>
      <Stack
        spacing={4}
      >
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
        >
          <ImageList
            variant="masonry"
            gap={50}
            sx={{
              columnCount: {
                xs: '2 !important',
                sm: '2 !important',
                md: '3 !important',
              },
            }}
          >
            {products.map((props) => <GalleryPageCard key={props.id} {...props} />)}
          </ImageList>
        </Box>
      </Stack>
    </Container>
  );
};

export default GalleryPage;
