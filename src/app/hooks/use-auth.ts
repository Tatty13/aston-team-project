import { authSelectors } from '@store'

import { useAppSelector } from './redux-hooks'

export function useAuth() {
  // const { email, token, id } = useAppSelector((state) => state.user)
  const email = useAppSelector(authSelectors.email)

  return {
    isAuth: !!email,
    email,
    // token,
    // id,
  }
}
