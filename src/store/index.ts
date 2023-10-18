import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({})

export const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
