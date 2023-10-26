import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
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
  },
})

export const { setSearchValue, resetSearch } = searchSlice.actions
export default searchSlice.reducer
