'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductService, Product } from '@/app/services/product-service';
import { TextField, Button, CircularProgress,Box ,Link} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { editProduct} from '../../product-slice';
const EditProductPage = (props:any) => {
  const router = useRouter();
  const id=props.params.id
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const dispatch=useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await ProductService.fetchProductById(id);
          setProducts(product);
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProduct();
  }, [id]);

    const handleEditProduct = () => {
      if(!name || price <= 0 || !description){
        alert('Please fill all fields !!')
      }else{
        dispatch(editProduct({
          id, name, price, description
        }));
        router.push('/dashboard/products');
      }
    }
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
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }} >
      <Link href="/dashboard" color="primary" underline="hover">Dashboard</Link>
      <Link href="/dashboard/products" color="primary" underline="hover">Products</Link>
      <Link href="/" underline="always">Edit</Link>
     </Box>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          value={name}
          type="string"
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={price}
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          type="string"
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditProduct}
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
