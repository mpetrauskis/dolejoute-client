import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { Product } from '../../../types/product';
import Img from '../../../components/admin-product-image';

type ProductCardProps = Product & {
  deleteItem: (itemId: string) => void,
};

const ProductPageCard: React.FC<ProductCardProps> = ({
  id, images, title, price, description, deleteItem,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Img src={images} alt="Image" />
      <Box>
        <Box>
          <Typography
            component="h2"
            variant="h6"
            sx={{
              lineHeight: '24px',
              mb: 2,
            }}
          >
            {`${title}`}
          </Typography>
          <Typography>{`price: ${price}`}</Typography>
          <Typography>{`description: ${description}`}</Typography>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/products/update/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteItem(id)}
          >
            <Delete />
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default ProductPageCard;
