import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux-hooks'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'
import { auth } from '../../../../firebase'
import { signOut } from 'firebase/auth'

const Navlink = () => {
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

export default Navlink
