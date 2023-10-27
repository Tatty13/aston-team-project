import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import favFilled from '@assets/icons/fav-filled.png'
import fav from '@assets/icons/fav.png'

import styles from './Card.module.scss'

interface ICard {
  id: string
  urls: IUrls
  alt_description: string
  liked_by_user?: boolean
}

interface IUrls {
  full: string
  raw: string
  regular: string
  small: string
  small_s3: string
  thumb: string
}

export const Card: FC<ICard> = ({
  id,
  urls,
  alt_description,
  liked_by_user,
}) => {
  const [isLiked, setIsLiked] = React.useState<boolean>(liked_by_user!)

  const handleLikePost = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsLiked(() => !isLiked)
  }

  return (
    <div className={styles.card}>
      <Link to={`/card?id=${id}`}>
        <div className={styles.fav}>
          <button className={styles.favBtn} onClick={handleLikePost}>
            <img src={isLiked ? favFilled : fav} alt='' />
          </button>
        </div>
        <div className={styles.cardPicture}>
          <img src={urls?.regular} alt='image' />
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.cardTitle}>
            {alt_description && alt_description.length > 100
              ? `${alt_description.slice(0, 100)}...`
              : alt_description}
          </div>
        </div>
      </Link>
    </div>
  )
}
