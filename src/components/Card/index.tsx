import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Card.module.scss'

import favFilled from '../../assets/icons/fav-filled.png'
import fav from '../../assets/icons/fav.png'

// TODO: Катя, доделай пожалуйста propsType
const Card: FC<any> = ({ id, urls, description = 'title', liked_by_user }) => {
  const [isLiked, setIsLiked] = React.useState(liked_by_user)
  const handleLikePost = () => {
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
          <img src={urls.regular} alt='image' />
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.cardTitle}>{description}</div>
        </div>
      </Link>
    </div>
  )
}

export default Card
