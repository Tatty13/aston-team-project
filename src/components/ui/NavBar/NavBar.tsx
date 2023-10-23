import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase'
import { useAppDispatch } from '../../../hooks/redux-hooks'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'

const NavBar = () => {
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

export default NavBar
