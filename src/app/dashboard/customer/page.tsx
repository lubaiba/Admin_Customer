'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CustomerService ,Order} from '@/app/services/customer-service';
import { Dialog, DialogContent, DialogTitle, DialogActions,Button,Link, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { deleteCustomers } from './customer-slice';
import { fetchCustomers} from './customer-slice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import {Box} from '@mui/material';
function CustomerList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch=useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers.customers); 
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  const handleDeleteCustomer = async () => {
    try {
      if (deleteCustomerId) {
        dispatch(deleteCustomers(deleteCustomerId));
        dispatch(fetchCustomers());
        closeDeleteDialog();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openDeleteDialog = (CustomerId: string) => {
    setDeleteCustomerId(CustomerId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteCustomerId(null);
    setIsDeleteDialogOpen(false);
  };
  const fetchCustomerOrders = async (customerId:string) => {
    try {
      const data = await CustomerService.getCustomerOrders(customerId);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };
  const theme=useTheme();
  const customerColumns: GridColDef[] = [
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'orders',
      headerName: 'Orders',
      width: 150,
      renderCell: (params) => (
        <div>
          <Link href={`/dashboard/customer/order/${params.row.id}`}>
            <Button variant="contained" style={{backgroundColor:theme.palette.primary.dark}}>Order List</Button>
          </Link>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions', 
      width: 150,
      renderCell: (params) => (
        <div>
          <Link href={`/dashboard/customer/edit/${params.row.id}`}>
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
    <div style={{ height: '100%', width: '75%',padding:'20px' }}>
      <div style={{ height: 400, width: '100%' }}>
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
      <Link href="/" underline="always">Customer</Link>
     </Box>
     <Box sx={{paddingBottom:'10px'}}>
      <Link href="/dashboard/customer/createCustomer/">
        <Button variant="contained" color="primary">Create New Customer</Button>
      </Link>
      </Box>
        <DataGrid
          rows={customers}
          columns={customerColumns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
       <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this customer?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCustomer} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerList;
