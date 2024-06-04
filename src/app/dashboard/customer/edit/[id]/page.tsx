'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerService,Customer } from '@/app/services/customer-service';
import { TextField, Button, CircularProgress,Box ,Link} from '@mui/material';
import { updateCustomer} from "../../customer-slice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
const EditProductPage = (props:any) => {
  const router = useRouter();
  const id=props.params.id
  const dispatch=useDispatch<AppDispatch>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone,setPhone]=useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const data = await CustomerService.fetchCustomerById(id as string);
          setCustomer(data);
          setFirstName(data.firstname);
          setLastName(data.lastname);
          setEmail(data.email);
          setPhone(data.phone);
        } catch (error) {
          console.error('Error fetching customer:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCustomer();
    }
  }, [id]);

  const handleUpdateCustomer = async () => {
    if (customer) {
      try {
        const updatedCustomer = {
          ...customer,
          firstname,lastname,email,phone
        };
        dispatch(updateCustomer({ customerId: id, customer: updatedCustomer }));
        router.push('/dashboard/customer'); 
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
        paddingTop:'10px',
        paddingBottom:'20px',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }} >
      <Link href="/dashboard" color="primary" underline="hover">Dashboard</Link>
      <Link href="/dashboard/customer" color="primary" underline="hover">Customers</Link>
      <Link href="/" underline="always">Edit</Link>
     </Box>
      <form noValidate autoComplete="off">
        <TextField
          label="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateCustomer}
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
