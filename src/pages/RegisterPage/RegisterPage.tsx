import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '@hooks'

import { SignUp } from './SignUp'

const RegisterPage = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate('/')
  }

  return (
    <div className='authContainer'>
      <h1>Register</h1>
      <SignUp />
      <p>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </div>
  )
}

export { RegisterPage }
