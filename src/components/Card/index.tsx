import { useAppSelector, useAuth } from '@src/app/hooks'
import { authSelectors } from '@src/store'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import favFilled from '@assets/icons/fav-filled.png'
import fav from '@assets/icons/fav.png'

import { db } from '../../../firebase'
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

export const Card: FC<ICard> = (props) => {
  const { isAuth } = useAuth()
  const { id, urls, alt_description, liked_by_user } = props
  const [isLiked, setIsLiked] = useState<boolean>(liked_by_user!)
  const uid = useAppSelector(authSelectors.uid)

  const handleLikePost = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsLiked(() => !isLiked)
  }

  const addFavorites = async () => {
    try {
      await setDoc(doc(db, `users/${uid}/favorites`, id), {
        ...props,
        liked_by_user: true,
      })
    } catch (error) {
      console.error('Ошибка при добавлении карточки в избранное: ', error)
    }
  }

  const removeFavorites = async (cardId: string) => {
    await deleteDoc(doc(db, `users/${uid}/favorites`, cardId))
  }

  return (
    <div className={styles.card}>
      <Link to={`/card?id=${id}`}>
        <div className={styles.fav}>
          <button
            disabled={!isAuth}
            title={
              !isAuth ? 'Authorize to add to favorites' : 'Add to favorites'
            }
            className={styles.favBtn}
            onClick={
              isLiked
                ? (e) => {
                    handleLikePost(e)
                    removeFavorites(id)
                  }
                : (e) => {
                    handleLikePost(e)
                    addFavorites()
                  }
            }
          >
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
