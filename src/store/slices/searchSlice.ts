import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  countPerPage: 30,
  totalPages: 0,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    resetSearch(state) {
      state.searchValue = ''
    },
    setTotalPages(state, { payload }: PayloadAction<number>) {
      state.totalPages = payload
    },
  },
})

export const { setSearchValue, resetSearch, setTotalPages } = searchSlice.actions
export default searchSlice.reducer
