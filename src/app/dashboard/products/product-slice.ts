import { Product } from "@/app/models/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductService } from "@/app/services/product-service";

export interface ProductState {
  products: Product[];
  updateProduct: Product[];
  inProgress: boolean;
  error?: any;
}

const initialState: ProductState = {
  products: [],
  updateProduct: [],
  inProgress: false,
  error: null
};
interface EditProductPayload{
  id:string;
  name:string;
  price:number;
  description:string;
  
}
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await ProductService.getProducts();
    return response;
  }
);
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (
    productData: Product,
    thunkAPI
  ) => {
    console.log('productData: ', productData);
    const response = await ProductService.addNewProduct(
      productData.name,
      productData.price.raw,
      productData.description,
    );
    return response;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, thunkAPI) => {
    await ProductService.deleteProduct(productId);
    return productId;
  }
);

interface EditProductPayload {
  id: string;
  name: string;
  price: number;
  description:string
}
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, name, price, description }: EditProductPayload, thunkAPI) => {
    try {
      const response = await ProductService.editProduct(id, name, price, description);
      return response;
    } catch (error) {
      console.error('Error editing product:', error);
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.inProgress = true;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.inProgress = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });
    builder.addCase(addNewProduct.pending, (state, action) => {
      state.inProgress = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.inProgress = false;
      state.products.push(action.payload);
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
        state.inProgress = false;
        state.products = state.products.filter(product => product.id !== action.payload);
    });
     builder.addCase(editProduct.pending, (state) => {
      state.inProgress = true;
  });
  builder.addCase(editProduct.fulfilled, (state, action) => {
      state.updateProduct = action.payload;
      state.inProgress = false;
  });
  builder.addCase(editProduct.rejected, (state, action) => {
      state.inProgress = false;
      state.error = action.error.message;
  });
  },
});
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
