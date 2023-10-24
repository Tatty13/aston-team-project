import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuthSliceState {
  statusAuth: 'LOADING' | 'SUCCESS'
  email: null | string
  uid: string
}

const initialState: IAuthSliceState = {
  statusAuth: 'LOADING',
  email: null,
  uid: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(
      state,
      actions: PayloadAction<{ email: string | null; uid: string }>
    ) {
      state.email = actions.payload.email
      state.uid = actions.payload.uid
      state.statusAuth = 'SUCCESS'
    },
    userNotFound(state) {
      state.email = null
      state.uid = ''
      state.statusAuth = 'SUCCESS'
    },
  },
})

export const { setAuthUser, userNotFound } = authSlice.actions
export default authSlice.reducer
