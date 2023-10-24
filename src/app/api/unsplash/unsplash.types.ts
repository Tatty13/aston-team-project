import { NumericRange } from '../../../types'

type AnsplashRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IRequestOptions {
  endPoint: string
  body?: any
  method?: AnsplashRequestMethods
}

export type OrdersList = 'latest' | 'oldest' | 'popular'
export type OrdersSearch = 'latest' | 'relevant'
export type Orientations = 'landscape' | 'portrait' | 'squarish'

export type Colors =
  | 'black_and_white'
  | 'black'
  | 'white'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'magenta'
  | 'green'
  | 'teal'
  | 'blue'

export type RandomPhotosCountRange = NumericRange<1, 31>
