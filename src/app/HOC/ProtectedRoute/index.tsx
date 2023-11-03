import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@hooks'

export const ProtectedRoute: FC<Record<string, unknown> & { component: FC }> = ({
  component: Component,
  ...props
}) => {
  const { isAuth } = useAuth()
  return isAuth ? <Component {...props} /> : <Navigate to='/login' replace />
}
