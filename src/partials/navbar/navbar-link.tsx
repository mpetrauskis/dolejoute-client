import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavbarLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontStyle: 'bold',
  color: theme.palette.common.black,
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  ':hover': {
    color: theme.palette.secondary.main,
  },
  '&.active': {
    color: theme.palette.secondary.main,
  },
}));

export default NavbarLink;
