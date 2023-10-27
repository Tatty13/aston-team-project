import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false,
}

const DarkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload
    },
  },
})

export const { setDarkMode } = DarkModeSlice.actions

export default DarkModeSlice.reducer
