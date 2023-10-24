import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@hooks'

export const ProtectedRoute: FC<any> = ({ component: Component, ...props }) => {
  const { isAuth } = useAuth()
  return isAuth ? <Component {...props} /> : <Navigate to='/login' replace />
}
