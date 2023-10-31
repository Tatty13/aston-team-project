import { Logo, NavBar } from '../ui'

import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Logo />
        <NavBar />
      </div>
    </header>
  )
}
