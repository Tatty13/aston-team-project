import { useAppSelector } from '@src/app/hooks'
import { authSelectors } from '@src/store'
import { addDoc, collection } from 'firebase/firestore'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import favFilled from '@assets/icons/fav-filled.png'
import fav from '@assets/icons/fav.png'

import { db } from '../../../firebase'
import styles from './Card.module.scss'

export const Card: FC<any> = ({
  id,
  urls,
  description = 'title',
  liked_by_user,
}) => {
  const [isLiked, setIsLiked] = useState(liked_by_user)
  const uid = useAppSelector(authSelectors.uid)

  const handleLikePost = () => {
    setIsLiked(() => !isLiked)
  }

  const addFavorites = async () => {
    try {
      const cardData = {
        id,
        urls,
        description: description || '',
        liked_by_user: true,
        uid,
      }
      await addDoc(collection(db, `users/${uid}/favorites/`), cardData)
    } catch (error) {
      console.error('Ошибка при добавлении карточки в избранное: ', error)
    }
  }

  // TODO: Доделать функцию удаления избранного
  // const removeFavorites = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(db, `users/${uid}/favorites`)
  //     )
  //     const documentIds = querySnapshot.docs.map((doc) => doc.data().id)

  //     documentIds.forEach((cardId) => {
  //       if (cardId === id) deleteDoc(doc(db, `users/${uid}/favorites`, cardId))
  //     })
  //   } catch (error) {
  //     console.error('Error removing favorites:', error)
  //   }
  // }

  return (
    <div className={styles.card}>
      <Link to={`/card?id=${id}`}>
        <div className={styles.fav}>
          <button
            className={styles.favBtn}
            onClick={
              isLiked
                ? () => {
                    handleLikePost()
                    // removeFavorites()
                  }
                : () => {
                    handleLikePost()
                    addFavorites()
                  }
            }
          >
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
