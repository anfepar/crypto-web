import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    maxItemsPerPage: 100
  },
  reducers: {
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    }
  },
})

const { actions, reducer } = paginationSlice

export const { updateCurrentPage } = actions

export default reducer