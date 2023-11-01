import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import cardsReducer from './slices/cardsSlice'
import searchReducer from './slices/searchSlice'
import userReducer from './slices/userSlice'
import { rtkQueryErrorLogger } from './middleware/rtkQuerryErrorLogger'

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cards: cardsReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
})

export * as authSelectors from './selectors/authSelectors'
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
