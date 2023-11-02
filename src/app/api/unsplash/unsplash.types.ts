import { NumericRange } from '@types'

type AnsplashRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IRequestOptions {
  endPoint: string
  body?: unknown
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

interface User {
  id: string
  username: string
  name: string
  first_name: string
  last_name: string
}

interface Location {
  name: null | string
  city: null | string
  country: null | string
  position: {
    latitude: number
    longitude: number
  }
}

type Urls = 'raw' | 'full' | 'regular' | 'small' | 'thumb' | 'small_s3'

type Photo = {
  id: string
  urls: Record<Urls, string>
}

interface Topic {
  id: string
  slug: string
  title: string
  visibility: string
}

export interface Card extends Photo {
  alt_description: string
  description: string | null
  likes: number
  liked_by_user: boolean
  location: Location
  user: User
  topics?: Topic[]
}

export interface Collection {
  id: string
  description: string | null
  title: string
  total_photos: number
  user: User
  cover_photo: Card
  preview_photos: Photo[]
}

export interface Data<P> {
  results: P[]
  total: number
  total_pages: number
}
