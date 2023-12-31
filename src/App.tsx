import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@hooks'
import { ProtectedRoute } from '@HOC'
import {
  CardInfoPage,
  FavoritesPage,
  HomePage,
  LoginPage,
  RegisterPage,
  HistoryPage,
  NotFoundPage,
} from '@pages'
import { checkAuth } from '@store/actions/authAction'
import { status } from '@store/selectors/authSelectors'
import { Layout, Preloader } from '@components'
import './App.scss'

function App() {
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(status)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (authStatus === 'LOADING') {
    return (
      <Preloader fullscreen/>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/card' element={<CardInfoPage />} />
        <Route
          path='/favorites'
          element={<ProtectedRoute component={FavoritesPage} />}
        />
        <Route
          path='/history'
          element={<ProtectedRoute component={HistoryPage} />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
