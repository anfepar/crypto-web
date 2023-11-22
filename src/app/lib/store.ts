import { configureStore } from '@reduxjs/toolkit'
import { cryptocurrenciesApi } from './cryptocurrenciesApi'


const store = configureStore({
  reducer: {
    [cryptocurrenciesApi.reducerPath]: cryptocurrenciesApi.reducer,
  }
})

export default store