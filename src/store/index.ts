import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import searchReducer from './slices/searchSlice'
import cardsReducer from './slices/cardsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cards: cardsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
