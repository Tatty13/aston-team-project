import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { setUser } from '../../store/slices/userSlice'
import { Form } from './Form'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user)
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
