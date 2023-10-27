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
      state.cardsData.push(action.payload)
    },
    addMoreCards(state, action: PayloadAction<any>) {
      state.cardsData = [...state.cardsData, ...action.payload]
    },
    removeCards(state) {
      state.cardsData = []
    },
  },
})

export const { replaceCards, addCards, addMoreCards, removeCards } =
  cardsSlice.actions
export default cardsSlice.reducer
