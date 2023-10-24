import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import { useAppDispatch } from './hooks/redux-hooks'
import { CardInfoPage } from './pages'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
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
