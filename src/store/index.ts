import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import cardsReducer from './slices/cardsSlice'
import searchReducer from './slices/searchSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cards: cardsReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export * as authSelectors from './selectors/authSelectors'
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
