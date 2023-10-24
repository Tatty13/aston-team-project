import { Link, useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux-hooks'

import { auth } from '../../../../firebase'
import { useAuth } from '../../../app/hooks/use-auth'
import { authSelectors } from '../../../store'
import { removeUser } from '../../../store/slices/userSlice'
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
          <Link to='/favorites'> Избранное </Link>
          <button onClick={() => handleLogout()}>Log out from {email}</button>
        </>
      ) : (
        <>
          <Link to='/login'>Войти</Link>
          <Link to='/login'>Регистрация</Link>
        </>
      )}
    </nav>
  )
}
