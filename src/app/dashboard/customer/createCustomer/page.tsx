'use client'
import { useState } from 'react';
import { Container, Typography, TextField, Button,Box ,Link} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addNewCustomer } from '../customer-slice';
export default function CreateCustomerPage () {
  const router = useRouter();
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone,setPhone]=useState<string>('');
  const dispatch=useDispatch<AppDispatch>();
  const createCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(addNewCustomer({firstname,lastname,email,phone}));
      router.push('/dashboard/customer');
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
      Create a new customer
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }} >
      <Link href="/dashboard" color="primary" underline="hover">Dashboard</Link>
      <Link href="/dashboard/customer" underline="hover">Customer</Link>
      <Link href="/"  color="primary" underline="always">New Customer</Link>
     </Box>
     <TextField
        label="First Name"
        fullWidth
        value={firstname}
        onChange={($e) => setFirstName($e.target.value)}
        margin="normal"
      />
      <TextField
        label="Last Name"
        fullWidth
        value={lastname}
        onChange={($e) => setLastName($e.target.value)}
        margin="normal"
      />
        <TextField
        label="Email"
        name="email"
        value={email}
        onChange={($e) => setEmail($e.target.value)}
        fullWidth
        margin="normal"
        required
      /> 
       <TextField
        label="Phone Number"
        name="phone"
        value={phone}
        onChange={($e) => setPhone($e.target.value)}
        fullWidth
        margin="normal"
        required
      /> 
      <Button type="submit" variant="contained" color="primary" onClick={createCustomer}>
       Create
      </Button>
    </Container>
  );
};


