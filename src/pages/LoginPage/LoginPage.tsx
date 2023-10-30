import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '@hooks'

import { Login } from './Login'

const LoginPage = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate('/')
  }

  return (
    <div className='authContainer'>
      <h1>Login</h1>
      <Login />
      <p>
        Don&apos;t have an account? <Link to='/register'>Register here</Link>
      </p>
    </div>
  )
}

export { LoginPage }
