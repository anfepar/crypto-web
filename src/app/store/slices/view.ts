import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    loading: false,
    error: ''
  },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    }
  },
})

const { actions, reducer } = viewSlice

export const { setLoading, setError } = actions

export default reducer