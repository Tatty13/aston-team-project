import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '../../../firebase'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { setUser } from '../../store/slices/userSlice'
import { Form } from './Form/Form'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        )
        navigate('/')
      })
      .catch(() => alert('Invalid user!'))
  }

  return <Form title='sign in' handleClick={handleLogin} />
}

export { Login }
