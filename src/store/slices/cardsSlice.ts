import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UnsplashTypes } from '@api'

interface ICardsInitialState {
  cardsData: UnsplashTypes.Card[]
  saveCardsData: UnsplashTypes.Card[]
}

const initialState: ICardsInitialState = {
  cardsData: [],
  saveCardsData: [],
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    replaceCards(state, action: PayloadAction<UnsplashTypes.Card[]>) {
      state.cardsData = action.payload
    },
    addMoreCards(state, action: PayloadAction<UnsplashTypes.Card[]>) {
      state.cardsData.push(...action.payload)
    },
    removeCards(state) {
      state.cardsData = []
    },
  },
})

export const { replaceCards, addMoreCards, removeCards } = cardsSlice.actions
export default cardsSlice.reducer
