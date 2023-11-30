import { CRYPTO_URL } from './constants/strings'
import { FETCH_ITEMS_LIMIT } from './constants/numbers'

export const getCryptoCurrenciesByPage = async (page: number) => {
  const response = await fetch(`${CRYPTO_URL}tickers/?start=${(page - 1) * FETCH_ITEMS_LIMIT}&limit=${FETCH_ITEMS_LIMIT}`);
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
