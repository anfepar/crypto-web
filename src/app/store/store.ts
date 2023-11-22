import { configureStore } from '@reduxjs/toolkit'
import cryptoCurrencies from "./slices/cryptoCurrencies"
import view from "./slices/view"
import pagination from "./slices/pagination"


const store = configureStore({
  reducer: {
    cryptoCurrencies: cryptoCurrencies,
    viewReducer: view,
    pagination: pagination
  },
})

export default store