import { createAsyncThunk } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../../../firebase'
import { setAuthUser, userNotFound } from '../slices/authSlice'

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  (_, { dispatch }) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return dispatch(setAuthUser({ email: user.email, uid: user.uid }))
      } else {
        return dispatch(userNotFound())
      }
    })
  }
)
