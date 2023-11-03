import { UnsplashTypes } from '@api'

export type SuggestionsBarProps = {
  photos: UnsplashTypes.Card[]
  visible: boolean
  errorMessage?: string
}
