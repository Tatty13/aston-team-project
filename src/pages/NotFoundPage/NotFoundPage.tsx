import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NotFoundPage.module.scss'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  
  const goBack = () => navigate(-1)
  const goToMainPage = () => navigate('/', { replace: true })

  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>404</p>
      <h2 className={styles.title}>Page not found</h2>
      <nav>
        <ul className={styles.navList}>
          <li>
            <button onClick={goBack} className={styles.navBtn} type='button'>
              Back
            </button>
          </li>
          <li>
            <button
              onClick={goToMainPage}
              className={styles.navBtn}
              type='button'
            >
              Main page
            </button>
          </li>
        </ul>
      </nav>
    </section>
  )
}
