import React from 'react'

import styles from './CardInfoPage.module.scss'
import { Card } from '../../components/organisms'

function CardInfoPage() {
  const params = new URLSearchParams(window.location.search)
  const cardId = params.get('id')
  const API_KEY = ''
  const urlImageById = `https://api.unsplash.com/photos/${cardId}?client_id=${API_KEY}`
  console.log(API_KEY)

  const [imgData, setImgData] = React.useState<any>(null)
  const [similarImages, setSimilarImages] = React.useState<any>(null)

  React.useLayoutEffect(() => {
    const getImgData = async () => {
      const response = await fetch(urlImageById)
      if (response.ok) {
        const photos = await response.json()
        setImgData(photos)

        const topic = photos.topics[0].id
        const urlImageByTopic = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&topics=${topic}&orientation=portrait&count=10`

        const responseOfSimilarsPhotos = await fetch(urlImageByTopic)
        const similar = await responseOfSimilarsPhotos.json()
        setSimilarImages(similar)
      } else {
        console.log('Error HTTP: ' + response.status)
      }
    }
    getImgData()
  }, [])

  return (
    <div className={styles.cardPage}>
      {imgData && (
        <div className={styles.cardInfo}>
          <div className={styles.cardImage}>
            <img src={imgData.urls.regular} alt='' />
          </div>
          <div className={styles.cardDescription}>
            <div className={styles.title}>
              <h1>{imgData.description}</h1>
            </div>
            <div className={styles.author}>{imgData.user.name}</div>
            <div className={styles.location}>
              {imgData.location.country}, {imgData.location.city}
            </div>
          </div>
        </div>
      )}
      <div className={styles.othersPosts}>
        <h1>You might like it</h1>
        <div className={styles.posts}>
          {similarImages &&
            similarImages.map((image, index) => (
              <Card key={image.id} {...image} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CardInfoPage
