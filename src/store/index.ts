import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export * as authSelectors from './selectors/authSelectors'
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
