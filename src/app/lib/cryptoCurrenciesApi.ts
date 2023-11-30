import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CRYPTO_URL } from './constants/strings'
import { FETCH_ITEMS_LIMIT } from './constants/numbers'
import { CryptoCurrency } from './types/CryptoCurrency'

interface CryptoApiResponse {
  data: CryptoCurrency[],
  info: {
    coins_num: number,
    time: number
  }
}

export const cryptoCurrenciesApi = createApi({
  reducerPath: 'cryptocurrenciesApi',
  baseQuery: fetchBaseQuery({ baseUrl: CRYPTO_URL }),
  endpoints: (builder) => ({
    getCryptocurrenciesByPage: builder.query<CryptoApiResponse, number>({
      query: (page) => `tickers/?start=${(page - 1) * FETCH_ITEMS_LIMIT}&limit=${FETCH_ITEMS_LIMIT}`
    }),
    getCryptoCurrencyById: builder.query<CryptoCurrency, string>({
      query: (id) => `ticker/?id=${id}`
    })
  })
})

export const getCryptoCurrencies = async (start: number) => {
  const response = await fetch(`${CRYPTO_URL}tickers/?start=${start}&limit=${FETCH_ITEMS_LIMIT}`);
  const data = await response.json()
  if (!response.ok) {
    throw Error('Error fetching crypto currencies', data.message)
  }
  return data;
}

export const getCryptoCurrenciesById = async (id: string) => {
  const response = await fetch(`${CRYPTO_URL}ticker/?id=${id}`);
  const data = await response.json()
  if (!response.ok) {
    throw Error('Error fetching crypto currency', data.message)
  }
  return data;
}

export const { useGetCryptocurrenciesByPageQuery } = cryptoCurrenciesApi
export const { getCryptocurrenciesByPage } = cryptoCurrenciesApi.endpoints;

