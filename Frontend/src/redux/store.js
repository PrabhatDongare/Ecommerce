import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer
  },
})
