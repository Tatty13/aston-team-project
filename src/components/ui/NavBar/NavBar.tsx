import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signOut } from 'firebase/auth'

import { useAppDispatch, useAppSelector, useAuth } from '@hooks'
import { authSelectors } from '@src/store/store'
import { removeUser } from '@store/slices/userSlice'

import { auth } from '../../../../firebase'
import { Preloader } from '../Preloader'
import styles from './NavBar.module.scss'

export const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuth, email } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(removeUser())
      navigate('/')
    } catch (error: string | any) {
      toast.error('Error logging out ', error)
    }
  }
  const statusAuth = useAppSelector(authSelectors.status)

  //TODO проверить, как будет себя вести при ошибке
  if (statusAuth !== 'SUCCESS') {
    return <Preloader fullscreen />
  }

  const handleActiveLink = ({ isActive }) => (isActive ? styles.activeLink : '')

  return (
    <nav className={styles.menu}>
      {isAuth ? (
        <>
          <NavLink to='/favorites' className={handleActiveLink}>
            Favorites
          </NavLink>
          <NavLink to='/history' className={handleActiveLink}>
            History
          </NavLink>
          <button onClick={() => handleLogout()} className={styles.logoutBtn}>
            Log out from <span>{email}</span>
          </button>
        </>
      ) : (
        <>
          <NavLink to='/login' className={handleActiveLink}>
            Login
          </NavLink>
          <NavLink to='/register' className={handleActiveLink}>
            Register
          </NavLink>
        </>
      )}
    </nav>
  )
}
