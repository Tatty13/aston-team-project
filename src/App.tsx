import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import { useAppDispatch } from './app/hooks/redux-hooks'
import CardInfoPage from './pages/CardInfoPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { checkAuth } from './store/actions/authAction'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

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
