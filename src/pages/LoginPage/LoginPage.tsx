import { Link, useNavigate } from 'react-router-dom'

import { Login } from './Login/Login'
import { useAuth } from '../../app/hooks'

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

export default LoginPage
