import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'
import Preloader from '../Preloader/Preloader'
import { authSelectors } from '../../../store'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const { isAuth, email } = useAuth()
  const statusAuth = useAppSelector(authSelectors.status)

  if (statusAuth !== 'SUCCESS') {
    return <Preloader />
  }

  return (
    <nav>
      {isAuth ? (
        <>
          <Link to='/favorites'> Избранное </Link>
          <button onClick={() => dispatch(removeUser())}>
            Log out from {email}
          </button>
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
