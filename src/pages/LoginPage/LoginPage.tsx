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
    <div>
      <h1>Login</h1>
      <Login />
      <p>
        Or <Link to='/register'>register</Link>
      </p>
    </div>
  )
}

export { LoginPage }
