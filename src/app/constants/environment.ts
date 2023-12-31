const BASE_URLS = {
  development: process.env.BASE_URL_DEV,
  production: process.env.BASE_URL_PROD,
}
const NODE_ENV = process.env.NODE_ENV || ''
export const CURRENT_BASE_URL = BASE_URLS[NODE_ENV]

export const UNSPLASH_API_ACCESS_KEY = process.env.UNSPLASH_API_ACCESS_KEY || ''
