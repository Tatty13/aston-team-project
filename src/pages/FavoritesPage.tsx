import { useAppSelector } from '@src/app/hooks'
import { CardList, Preloader } from '@src/components'
import { authSelectors } from '@src/store'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../firebase'

const FavoritesPage = () => {
  const [data, setData] = useState<Array<object>>([])
  const uid = useAppSelector(authSelectors.uid)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(
      collection(db, `users/${uid}/favorites`),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => doc.data())
        setData(newData)
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
