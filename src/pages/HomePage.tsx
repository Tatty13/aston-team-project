import { useAppDispatch } from '../hooks/redux-hooks'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'

const HomePage: any = () => {
  const dispatch = useAppDispatch()

  const { isAuth, email } = useAuth()

  return (
    <div>
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>
        Log out from {email}
      </button>
    </div>
  )
}

export default HomePage
