import { configureStore } from '@reduxjs/toolkit'
import { cryptoCurrenciesApi } from './cryptoCurrenciesApi'


const store = configureStore({
  reducer: {
    [cryptoCurrenciesApi.reducerPath]: cryptoCurrenciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoCurrenciesApi.middleware),
})

export default store