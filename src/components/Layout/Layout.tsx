import { FC } from 'react'

import { LayoutProps } from './Layout.types'
import { Header } from '../Header'
import styles from './Layout.module.scss'

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
