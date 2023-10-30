import { useCallback, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@src/app/hooks'
import { authSelectors } from '@src/store'
import { Card } from '@components'
import { getPhotoById, getRandomPhoto } from '@src/app/api/unsplash'
import { doc, setDoc } from 'firebase/firestore'

import { db } from '../../../firebase'

import styles from './CardInfoPage.module.scss'

function CardInfoPage() {
  const location = useLocation()
  const uid = useAppSelector(authSelectors.uid)

  const [imgData, setImgData] = useState<any>(null)
  const [similarImages, setSimilarImages] = useState<any>(null)

  const getImgData = useCallback(
    async (cardId) => {
      const response = await getPhotoById(cardId!)
      setImgData(response)

      try {
        await setDoc(doc(db, `users/${uid}/cardsHistory`, cardId), {
          ...response,
        })
      } catch (error) {
        console.error('Ошибка при добавлении карточки в историю: ', error)
      }

      const topic = response?.topics[0]?.id

      const responseOfSimilarsPhotos = await getRandomPhoto({
        topics: topic,
        orientation: 'portrait',
        count: 20,
      })

      setSimilarImages(responseOfSimilarsPhotos)
    },
    [uid]
  )

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    getImgData(id)
  }, [location, getImgData])

  return (
    <div className={styles.cardPage}>
      {imgData && (
        <section className={styles.cardInfo}>
          <div className={styles.cardImage}>
            <img src={imgData?.urls?.regular} alt='' />
          </div>
          <div className={styles.cardDescription}>
            <div className={styles.title}>
              <h2>{imgData?.description}</h2>
            </div>
            <div className={styles.extraInfo}>
              <div className={styles.author}>{imgData?.user?.name}</div>
              <div className={styles.location}>
                {imgData?.location?.country}
                {imgData.location.city
                  ? `, ${imgData.location.city}`
                  : 'Unknown location'}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className={styles.othersPosts}>
        <h2>You might like it</h2>
        <ul className={styles.posts}>
          {similarImages &&
            similarImages.map((image) => (
              <li key={image.id}>
                <Card key={image.id} {...image} />
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}

export { CardInfoPage }
