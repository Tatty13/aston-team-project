import { FC, useState } from 'react'
import styles from './Form.module.css'

interface FormProps {
  title: string
  handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <form className={styles.form}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email'
      />
      <input
        type='password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder='password'
      />
      <button onClick={() => handleClick(email, pass)}>{title}</button>
    </form>
  )
}

export { Form }
