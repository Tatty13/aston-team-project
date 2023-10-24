import { FC } from 'react'

import { IPreloaderProps } from './Preloader.types'
import styles from './Preloader.module.scss'

export const Preloader: FC<IPreloaderProps> = ({ fullscreen }) => {
  return (
    <div
      className={`${styles.preloader} ${
        fullscreen && styles.preloader_fullscreen
      }`}
    >
      <span className={styles.spinner} />
    </div>
  )
}
