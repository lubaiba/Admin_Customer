import { Customer } from "@/app/models/customer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerService } from "@/app/services/customer-service";

export interface CustomerState {
  customers: Customer[];
  updateCustomer: {};
  inProgress: boolean;
  error?: any;
}

const initialState: CustomerState = {
  customers: [],
  updateCustomer: {},
  inProgress: false,
};

export interface Order {
    id: string;
    customer_id: string;
    order_date: string;
    status: string;
    total: {
      raw: number;
      formatted_with_symbol: string;
    };
  }

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await CustomerService.getCustomers();
    return response;
  }
);
export const addNewCustomer = createAsyncThunk(
  "customers/addNewCustomer",
  async (
    customerData: {
        firstname: string;
        lastname: string;
          email: string;
          phone: string;
    },
    thunkAPI
  ) => {
    const response = await CustomerService.addNewCustomer(
      customerData.firstname,
      customerData.lastname,
      customerData.email,
      customerData.phone
    );
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer', async ({ customerId,customer}: {customerId: string, customer: Partial<Customer>}) => {
    await CustomerService.editCustomer(customerId,customer);
    return { customerId,customer };
});

export const deleteCustomers = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId: string, thunkAPI) => {
    await CustomerService.deleteCustomer(customerId);
    return customerId;
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    setCustomers(state, action) {
      state.customers = action.payload;
    },
    fetchOrders(state, action) {
      state.customers = action.payload;
  },},
   extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.inProgress = true;
      state.customers = [];
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.inProgress = false;
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });
    builder.addCase(addNewCustomer.fulfilled, (state, action) => {
      state.inProgress = false;
      state.customers.push(action.payload);
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.inProgress = false;
      state.updateCustomer=action.payload;
    });
    builder.addCase(deleteCustomers.fulfilled, (state, action) => {
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
    });
},
});
export const { setCustomers,fetchOrders } = customerSlice.actions;
export default customerSlice.reducer;
