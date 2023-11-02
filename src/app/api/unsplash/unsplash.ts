import { UNSPLASH_API_ACCESS_KEY } from '@constants'

import {
  Card,
  Data,
  Colors,
  IRequestOptions,
  OrdersList,
  OrdersSearch,
  Orientations,
  RandomPhotosCountRange,
  Collection,
} from './unsplash.types'

const apiOptions = {
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_API_ACCESS_KEY}`,
  },
}

const checkResponse = async <P>(res: Response) =>
  res.ok
    ? (res.json() as Promise<P>)
    : res.json().then((err) => Promise.reject(err?.errors[0]))

const makeRequest = async <P>({ endPoint, body, method }: IRequestOptions) => {
  try {
    const { baseURL, headers } = apiOptions
    const options: RequestInit = {
      headers,
      method: method || 'GET',
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const res = await fetch(`${baseURL}${endPoint}`, options)
    return checkResponse<P>(res)
  } catch (err) {
    return Promise.reject('Unexpected error from makeRequest')
  }
}

const getQueryString = (params: object) => {
  const queries: string[] = []

  for (const key in params) {
    if (params[key]) {
      queries.push(`${key}=${params[key]}`)
    }
  }

  return '?' + queries.join('&')
}

/**
 * Get a single photo by photo's id.
 */
export const getPhotoById = (id: string) =>
  makeRequest<Card>({ endPoint: `/photos/${id}` })

/**
 * Get a single page from the Editorial feed.
 */
export const getListPhotos = (params?: {
  page?: number
  per_page?: number
  order_by?: OrdersList
}) => {
  let queryString = ''

  if (params) {
    queryString = getQueryString(params)
  }

  return makeRequest<Card[]>({ endPoint: `/photos${queryString}` })
}

/**
 * Get a random photo.
 * "topics" value is a string with a public topic ID(‘s). If multiple, comma-separated
 */
export const getRandomPhoto = (params?: {
  query?: string
  orientation?: Orientations
  count?: RandomPhotosCountRange
  topics?: string
}) => {
  let queryString = ''

  if (params) {
    queryString = getQueryString(params)
  }

  return makeRequest<Card | Card[]>({
    endPoint: `/photos/random${queryString}`,
  })
}

/**
 * Get a single page of photo results for a query.
 */
export const searchPhoto = <P extends Card>(params: {
  query: string
  orientation?: Orientations
  count?: RandomPhotosCountRange
  page?: number
  per_page?: number
  order_by?: OrdersSearch
  color?: Colors
}) => {
  const queryString = getQueryString(params)
  return makeRequest<Data<P>>({ endPoint: `/search/photos${queryString}` })
}

/**
 * Get a single page of collection results for a query.
 */
export const searchCollections = (params: {
  query: string
  page?: number
  per_page?: number
}) => {
  const queryString = getQueryString(params)
  return makeRequest<Data<Collection>>({
    endPoint: `/search/collections${queryString}`,
  })
}
