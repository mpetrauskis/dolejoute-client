import {
  Box, Button, Container, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete } from '@mui/icons-material';
import CustomizedSwitch from '../../components/orders-switch';

function createData(
  email: string,
  price: string,
  description: string,
) {
  return {
    email, price, description,
  };
}

const rows = [
  createData('jogurtina@gmail.com', '250 - 303', 'I whant silver ring with 3mm diamond tension if bosible'),
  createData('pelenine@gmail.com', '400', 'Gold ring band'),
  createData('klevenaras@gmail.com', '1000', 'Wedding rings with 5mm diamond swiss cut if posible'),
  createData('kraustytis@gmail.com', '250 - 303', 'Can you make me titanium ring with ruby tension if bosible'),
  createData('dviratis@gmail.com', '250 - 303', 'Can you make me self created ring, your newest project '),
];

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{
        my: 7,
      }}
      />
      <Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/admin/products')}
        >
          Products
        </Button>
      </Box>
      <Box sx={{ my: 7 }}>
        <Typography
          variant="h2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          Page user orders!
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, background: '#C9E4C5' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Buyers</TableCell>
                <TableCell align="center">Price range</TableCell>
                <TableCell align="center">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right"><Button variant="contained" color="error"><Delete /></Button></TableCell>
                  <TableCell align="right"><CustomizedSwitch /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminPage;
