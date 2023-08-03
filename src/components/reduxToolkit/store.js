import { configureStore } from '@reduxjs/toolkit'
import  productdetails  from './apislice'

export const store = configureStore({
    reducer: {
      productApi : productdetails
    }
})