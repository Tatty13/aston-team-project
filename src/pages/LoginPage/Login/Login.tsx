import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@hooks'
import { Form } from '@components'
import { setUser } from '@store/slices/userSlice'
import { toast } from 'react-toastify'

import { auth } from '../../../../firebase'

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
      .catch((error) => toast.error('Incorrect email or password', error))
  }

  return <Form title='Sign In' handleSubmit={handleLogin} />
}

export { Login }
