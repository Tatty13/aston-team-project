import { FC, useState } from 'react'

import styles from './Form.module.scss'

interface FormProps {
  title: string
  handleSubmit: (email: string, pass: string) => void
}

export const Form: FC<FormProps> = ({ title, handleSubmit }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      setEmailError('Email is required')
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required')
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
    } else {
      setPasswordError('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPass(value)
    validatePassword(value)
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(email, pass)
      }}
    >
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
          required
        />
      </div>
      {emailError && <p>{emailError}</p>}
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          value={pass}
          onChange={handlePasswordChange}
          placeholder='Password'
          required
        />
      </div>
      {passwordError && <p>{passwordError}</p>}
      <button>{title}</button>
    </form>
  )
}
