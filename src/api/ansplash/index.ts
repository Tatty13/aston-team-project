import { ANSPLASH_API_ACCESS_KEY } from '../../constants/enviroment'
import {
  IRequestOptions,
  OrdersList,
  OrdersSearch,
  Orientations,
  Colors,
  RandomPhotosCountRange,
} from './ansplash.types'

const apiOptions = {
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ANSPLASH_API_ACCESS_KEY}`,
  },
}

const checkResponce = async (res: Response) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err?.errors[0]))

const makeRequest = async ({ endPoint, body, method }: IRequestOptions) => {
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
    return checkResponce(res)
  } catch (err) {
    return Promise.reject('Unexpected error from makeRequest')
  }
}

const getQueryString = (params: object) => {
  const queries: string[] = []

  for (let key in params) {
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
  makeRequest({ endPoint: `/photos/${id}` })

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

  return makeRequest({ endPoint: `/photos${queryString}` })
}

/**
 * Get a random photo
 */
export const getRandomPhoto = (params?: {
  query?: string
  orientation?: Orientations
  count?: RandomPhotosCountRange
}) => {
  let queryString = ''

  if (params) {
    queryString = getQueryString(params)
  }

  return makeRequest({ endPoint: `/photos/random${queryString}` })
}

/**
 * Get a single page of photo results for a query.
 */
export const searchPhoto = (params: {
  query: string
  orientation?: Orientations
  count?: RandomPhotosCountRange
  page?: number
  per_page?: number
  order_by?: OrdersSearch
  color?: Colors
}) => {
  const queryString = getQueryString(params)
  return makeRequest({ endPoint: `/search/photos${queryString}` })
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
  return makeRequest({ endPoint: `/search/collections${queryString}` })
}
