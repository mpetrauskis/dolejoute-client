import React from 'react';
import {
  ImageListItem as ImageListItemStyled,
  ImageListItemBar,
  Typography,
  Popover,
} from '@mui/material';

import pageTheme from '../../styles/theme';
import { Product } from '../../types/product';

type GalleryPageCardProps = Product;

const GalleryPageCard: React.FC<GalleryPageCardProps> = ({
  id,
  title,
  price,
  images,
  description,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ImageListItemStyled
      className="image"
      key={id}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <img
        src={`${images}?w=248&fit=crop&auto=format&dpr=2`}
        alt=""
        loading="lazy"
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          maxWidth: '100%',
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
      >
        <Typography sx={{ p: 1, background: '#C9E4C5', maxWidth: 350 }}>
          <Typography variant="h6" component="h3">{title}</Typography>
          <Typography>
            <br />
            Price around:
            {' '}
            {price}
          </Typography>
          <br />
          <Typography>{description}</Typography>
        </Typography>
      </Popover>
      <ImageListItemBar
        title={(
          <Typography
            component="h3"
          >
            {title}
          </Typography>
                  )}
        sx={{
          display: 'flex',
          alignItems: 'end',
          height: '20%',
          transition: pageTheme.transitions.create('opacity', { duration: 1000 }),
          opacity: 1,
        }}
      />
    </ImageListItemStyled>
  );
};

export default GalleryPageCard;
