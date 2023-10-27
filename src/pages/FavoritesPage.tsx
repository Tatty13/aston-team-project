import { useAppSelector } from '@src/app/hooks'
import { CardList, Header, Preloader } from '@src/components'
import { authSelectors } from '@src/store'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../firebase'

const FavoritesPage = () => {
  const [data, setData] = useState<Array<object>>([])
  const uid = useAppSelector(authSelectors.uid)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async (): Promise<Array<object>> => {
      const querySnapshot = await getDocs(
        collection(db, `users/${uid}/favorites`)
      )
      return querySnapshot.docs.map((doc) => doc.data())
      // const filteredData = fetchedData.filter((item, index, self) => {
      //   return (
      //     item.uid === uid &&
      //     self.findIndex((el) => el.id === item.id) === index
      //   )
      // })
    }

    fetchData()
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [uid])

  return (
    <>
      <Header />
      {isLoading && <Preloader />}
      {!isLoading && data.length > 0 && <CardList cards={data} />}
      {!isLoading && data.length === 0 && <h1>You have no favorites</h1>}
    </>
  )
}

export { FavoritesPage }
