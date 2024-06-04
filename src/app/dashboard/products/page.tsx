'use client';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions,Box ,Link} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { fetchProducts} from './product-slice';
import { deleteProducts } from './product-slice';
import { useTheme } from '@mui/material';
const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch=useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products); 
  const theme=useTheme();
  useEffect(() => {
    dispatch(fetchProducts());
    setLoading(false);
  }, []);

  const handleDeleteProduct = async () => {
    try {
      if (deleteProductId) {
        dispatch(deleteProducts(deleteProductId));
        dispatch(fetchProducts());
        closeDeleteDialog();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openDeleteDialog = (productId: string) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteProductId(null);
    setIsDeleteDialogOpen(false);
  };
  
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      renderCell: (params) => {
        const price = params.value?.formatted_with_symbol || '';
        return <span>{price}</span>;
      },
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => <img src={params.value?.url} alt={params.row.name} style={{ width: 50 }} />,
    },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Link href={`/dashboard/products/edit/${params.row.id}`}>
            <Button variant="contained" style={{backgroundColor:theme.palette.secondary.main}}>Edit</Button>
          </Link>
          <Button
            variant="contained"
            style={{backgroundColor:theme.palette.primary.main}}
            onClick={() => openDeleteDialog(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '75%' ,padding:'20px'}}>
      <h1>Products</h1>
     
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
      <Link href="/" underline="always">Products</Link>
     </Box>
     <Box sx={{paddingBottom:'10px'}}>
      <Link href="/dashboard/products/createProduct/">
        <Button variant="contained" color="primary">Create New Product</Button>
      </Link>
      </Box>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={loading}
      />
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
