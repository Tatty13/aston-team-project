import { authSelectors } from '@store/store'

import { useAppSelector } from './redux-hooks'

export function useAuth() {
  const email = useAppSelector(authSelectors.email)

  return {
    isAuth: !!email,
    email,
  }
}
