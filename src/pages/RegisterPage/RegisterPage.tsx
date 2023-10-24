import { Link, useNavigate } from 'react-router-dom'

import { SignUp } from './SignUp/SignUp'
import { useAuth } from '../../app/hooks'

const RegisterPage = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate('/')
  }

  return (
    <div>
      <h1>Register</h1>
      <SignUp />
      <p>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </div>
  )
}

export default RegisterPage
