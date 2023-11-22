import { CRYPTO_URL } from "../constants/strings"

export const getCryptocurrencies = () => {
  return fetch(`${CRYPTO_URL}/tickers/`)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error('Error trying to fetch crypto currencies', { cause: { code: response.status, message: text } }); })
      }
      return response.json()
    })
}