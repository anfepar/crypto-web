import { configureStore } from '@reduxjs/toolkit'
import { cryptoCurrenciesApi } from './cryptoCurrenciesApi'
import currentPageReducer from "./currentPage"



const store = configureStore({
  reducer: {
    [cryptoCurrenciesApi.reducerPath]: cryptoCurrenciesApi.reducer,
    currentPage: currentPageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoCurrenciesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export default store