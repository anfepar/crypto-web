import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const paginationSlice = createSlice({
  name: 'currentPage',
  initialState: 1,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      return action.payload
    },
  },
})

const { actions, reducer } = paginationSlice

export const { setCurrentPage } = actions

export default reducer
