import { CryptoCurrency } from "@/app/types/Cryptocurrency"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const cryptoCurrenciesSlice = createSlice({
  name: 'cryptoCurrencies',
  initialState: [],
  reducers: {
    addCurrenciesData(state: CryptoCurrency[], action: PayloadAction<CryptoCurrency[]>) {
      state.concat(action.payload)
    }
  },
})

const { actions, reducer } = cryptoCurrenciesSlice

export const { addCurrenciesData } = actions

export default reducer