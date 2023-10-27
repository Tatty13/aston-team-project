import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import { useAppDispatch } from '@hooks'
import {
  CardInfoPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  RegisterPage,
  HistoryPage,
} from '@pages'
import { checkAuth } from '@store/actions/authAction'
import { Layout } from '@components'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/card' element={<CardInfoPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/history' element={<HistoryPage />} />
      </Routes>
    </Layout>
  )
}

export default App
