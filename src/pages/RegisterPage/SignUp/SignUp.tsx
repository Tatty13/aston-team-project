import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '../../../../firebase'
import { useAppDispatch } from '../../../app/hooks'
import { Form } from '../../../components'
import { setUser } from '../../../store/slices/userSlice'

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
      .catch(console.error)
  }

  return <Form title='register' handleClick={handleRegister} />
}

export { SignUp }
