import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CRYPTO_URL, FETCH_ITEMS_LIMIT } from '../constants/strings'
import { CryptoCurrency } from '../types/Cryptocurrency'


export const cryptocurrenciesApi = createApi({
  reducerPath: 'cryptocurrenciesApi',
  baseQuery: fetchBaseQuery({ baseUrl: CRYPTO_URL }),
  endpoints: (builder) => ({
    getCryptocurrenciesByPage: builder.query<CryptoCurrency, number>({
      query: (page) => `tickers/?start=${page * FETCH_ITEMS_LIMIT}&limit=${FETCH_ITEMS_LIMIT}`
    })
  })
})

export const { useGetCryptocurrenciesByPageQuery } = cryptocurrenciesApi
export const { getCryptocurrenciesByPage } = cryptocurrenciesApi.endpoints;

