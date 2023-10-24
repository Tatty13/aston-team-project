import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICardsInitialState {
  cardsData: any[]
  saveCardsData: any[]
}

const initialState: ICardsInitialState = {
  cardsData: [],
  saveCardsData: [],
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    replaceCards(state, action: PayloadAction<any>) {
      state.cardsData = action.payload
    },
    addCards(state, action: PayloadAction<any>) {
      state.cardsData = state.cardsData.concat(action.payload)
    },
    removeCards(state) {
      state.cardsData = []
    },
  },
})

export const { replaceCards, addCards, removeCards } = cardsSlice.actions
export default cardsSlice.reducer