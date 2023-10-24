import { Link, useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'

import { useAppDispatch, useAppSelector, useAuth } from '@hooks'
import { authSelectors } from '@store'
import { removeUser } from '@store/slices/userSlice'

import { auth } from '../../../../firebase'
import { Preloader } from '../Preloader'

export const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuth, email } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(removeUser())
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  const statusAuth = useAppSelector(authSelectors.status)

  if (statusAuth !== 'SUCCESS') {
    return <Preloader />
  }

  return (
    <nav>
      {isAuth ? (
        <>
          <Link to='/favorites'>Favorites</Link>
          <button onClick={() => handleLogout()}>Log out from {email}</button>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </nav>
  )
}
