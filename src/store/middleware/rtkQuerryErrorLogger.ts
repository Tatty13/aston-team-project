import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

interface ICustomError {
  error: string
  status: number | string
  data?: {
    message: string
  }
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const customError = action.payload as ICustomError
    if (customError.status === 'FETCH_ERROR') {
      return toast.error('Ошибка подключения к серверу')
    } else if (customError.status === 400 && customError.data) {
      return toast.error(customError.data.message)
    } else {
      return toast.error(customError.error)
    }
  }
  return next(action)
}
