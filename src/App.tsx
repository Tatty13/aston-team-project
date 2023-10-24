import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { useAppDispatch } from './hooks/redux-hooks'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { removeUser, setUser } from './store/slices/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, refreshToken } = user
        dispatch(
          setUser({
            email,
            id: uid,
            token: refreshToken,
          })
        )
      } else {
        dispatch(removeUser())
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/card' element={<CardInfoPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
    </Routes>
  )
}

export default App
