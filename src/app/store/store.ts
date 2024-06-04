import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../dashboard/products/product-slice'
import customersReducer from '../dashboard/customer/customer-slice'
export const store = configureStore({
  reducer: {
    products:productsReducer,
    customers:customersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch