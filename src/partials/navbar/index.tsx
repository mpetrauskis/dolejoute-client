import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
} from '@mui/material';
import NavbarLink from './navbar-link';
import NavbarAuthMenu from './navbar-auth-menu';
import NavbarVisitorMenu from './navbar-visitor-menu';
import { useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn } from '../../store/selectors';

const Navbar: React.FC = () => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Container>
        <Toolbar sx={{
          px: { xs: 0, sm: 0 },
          justifyContent: 'space-between',
        }}
        >
          <Box>
            <NavbarLink sx={{ fontSize: 30, marginRight: 30 }} to="/">Dolejoute</NavbarLink>
            <NavbarLink sx={{ fontSize: 20 }} to="/auth/gallery-page">Gallery Page</NavbarLink>
            <NavbarLink sx={{ fontSize: 20 }} to="/auth/order-page">Order custom ring!</NavbarLink>
          </Box>
          <Box sx={{ display: 'flex' }}>
            {loggedIn ? <NavbarAuthMenu /> : <NavbarVisitorMenu />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
