import React from 'react';
import NavbarLink from './navbar-link';

const NavbarVisitorMenu: React.FC = () => (
  <>
    <NavbarLink to="/auth/login">Login</NavbarLink>
    <NavbarLink to="/auth/register">Register</NavbarLink>
  </>
);

export default NavbarVisitorMenu;
