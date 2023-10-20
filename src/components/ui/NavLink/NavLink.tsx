import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux-hooks'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'

const Navlink = () => {
  const dispatch = useAppDispatch()
  const { isAuth, email } = useAuth()

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

export default Navlink
