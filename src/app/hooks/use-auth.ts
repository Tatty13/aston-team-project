import { authSelectors } from '@src/store/store'

import { useAppSelector } from './redux-hooks'

export function useAuth() {
  const email = useAppSelector(authSelectors.email)

  return {
    isAuth: !!email,
    email,
  }
}
