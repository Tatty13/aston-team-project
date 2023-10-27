import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Card } from '@components'

import { getPhotoById, getRandomPhoto } from '@src/app/api/unsplash'

import styles from './CardInfoPage.module.scss'

function CardInfoPage() {
  const location = useLocation()

  const [imgData, setImgData] = useState<any>(null)
  const [similarImages, setSimilarImages] = useState<any>(null)

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    getImgData(id)
  }, [location])

  const getImgData = async (cardId) => {
    console.log(cardId)
    const response = await getPhotoById(cardId!)
    console.log(response)
    setImgData(response)

    if (localStorage.getItem('cardshistory')) {
      const history = JSON.parse(localStorage.getItem('cardshistory') || '')
      history.unshift(response)
      localStorage.setItem('cardshistory', JSON.stringify(history))
    } else {
      const history: string[] = []
      history.unshift(response || '')
      localStorage.setItem('cardshistory', JSON.stringify(history))
    }

    const topic = response?.topics[0]?.id

    const responseOfSimilarsPhotos = await getRandomPhoto({
      topics: topic,
      orientation: 'portrait',
      count: 20,
    })

    setSimilarImages(responseOfSimilarsPhotos)
  }

  return (
    <div className={styles.cardPage}>
      {imgData && (
        <div className={styles.cardInfo}>
          <div className={styles.cardImage}>
            <img src={imgData?.urls?.regular} alt='' />
          </div>
          <div className={styles.cardDescription}>
            <div className={styles.title}>
              <h1>{imgData?.description}</h1>
            </div>
            <div className={styles.dopinfo}>
              <div className={styles.author}>{imgData?.user?.name}</div>
              <div className={styles.location}>
                {imgData?.location?.country}
                {imgData.location.city ? `, ${imgData.location.city}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.othersPosts}>
        <h1>You might like it</h1>
        <ul className={styles.posts}>
          {similarImages &&
            similarImages.map((image, index) => (
              <li key={image.id}>
                <Card key={image.id} {...image} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export { CardInfoPage }
