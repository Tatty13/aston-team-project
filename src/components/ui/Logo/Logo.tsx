import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Logo.module.scss'

export const Logo: FC = () => {
  return (
    <Link to='/' className={styles.link}>
      <h1 className={styles.title}>Photo Gallery</h1>
      <p className={styles.subtitle}>find your photo</p>
    </Link>
  )
}
