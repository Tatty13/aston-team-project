import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import { CardList, Preloader } from '@components'
import { useAppSelector } from '@hooks'
import { authSelectors } from '@store/store'
import { UnsplashTypes } from '@api'

import { db } from '../../firebase'

const FavoritesPage = () => {
  const [data, setData] = useState<Array<UnsplashTypes.Card>>([])
  const uid = useAppSelector(authSelectors.uid)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(
      collection(db, `users/${uid}/favorites`),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => doc.data())
        setData(newData as UnsplashTypes.Card[])
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [uid])

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading && data.length > 0 && <CardList cards={data} />}
      {!isLoading && data.length === 0 && <h2>You have no favorites</h2>}
    </>
  )
}

export { FavoritesPage }
