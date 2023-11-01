import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Form } from '@components'
import { useAppDispatch } from '@hooks'
import { setUser } from '@store/slices/userSlice'

import { auth } from '../../../../firebase'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
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
      .catch((error) => toast.error('Incorrect email or password ', error))
  }

  return <Form title='Sign Out' handleSubmit={handleRegister} />
}

export { SignUp }
