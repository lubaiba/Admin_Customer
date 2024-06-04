'use client';

import { useEffect, useState } from 'react';
import { CustomerService,Order } from '@/app/services/customer-service';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { Box,Link } from '@mui/material';
import { AppDispatch } from '@/app/store/store';
import { fetchOrders as fetchOrdersAction} from '../../customer-slice';
const OrderDetailsPage = (props:any) => {
    const customerId=props.params.id;
   const [orders, setOrders] = useState<Order[]>([]); 
    const [loading, setLoading] = useState(true);
   const dispatch=useDispatch<AppDispatch>();
    const fetchOrders = async () => {
      if (typeof customerId === 'string') {
        try {
          const data = await CustomerService.getCustomerOrders(customerId);
          setOrders(data);
          dispatch(fetchOrdersAction(data));
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    useEffect(() => {
      fetchOrders();
    }, [customerId]);
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Order ID', width: 150 },
      { field: 'status', headerName: 'Status', width: 120 },
      {
        field: 'order_value',
        headerName: 'Total',
        width: 120,
        renderCell: (params) => {
          const order_value = params.value?.formatted_with_symbol || '';
          return <span>{order_value}</span>;
        },
      },
    { field: 'status_payment', headerName: 'Payment status', width: 150 },
    { field: 'customer', headerName: 'Email', width: 100,
        renderCell:(params)=>{
            const customer=params.value.email;
            return <span>{customer}</span>;
        }
     },
    ];
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <h1>Order Details</h1>
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
      <Link href="/dashboard/customer" color="primary" underline="hover">Customers</Link>
      <Link href="/" underline="always">Orders</Link>
     </Box>
        <DataGrid
          rows={orders}
          columns={columns}
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
      </div>
    );
  };
  
  export default OrderDetailsPage;
