import { useEffect, useState } from 'react'

import { UnsplashApi } from '@api'
import { Card, Preloader } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { useNavigate } from 'react-router-dom'

import { authSelectors } from '@store/store'
import { collection, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../../../firebase'

import styles from './History.module.scss'

function HistoryPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [cardshistory, setCardsHistory] = useState<Array<object>>([])
  const [searchHistory, setSearchHistory] = useState<Array<any>>([])
  const uid = useAppSelector(authSelectors.uid)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(
      collection(db, `users/${uid}/cardsHistory`),
      (snapshot) => {
        const cards = snapshot.docs.map((doc) => doc.data())
        setCardsHistory(cards.reverse())
        setIsLoading(false)
      }
    )

    const unsubscribe2 = onSnapshot(
      collection(db, `users/${uid}/searchHistory`),
      (snapshot) => {
        const search = snapshot.docs.map((doc) => doc.data())
        setSearchHistory(search.reverse())
        setIsLoading(false)
      }
    )

    return () => {
      unsubscribe()
      unsubscribe2()
    }
  }, [uid])

  const handleSearchItem = async (searchValue) => {
    UnsplashApi.searchPhoto({ query: searchValue, per_page: 20 })
      .then((res) => {
        dispatch(replaceCards(res.results))
      })
      .catch((error) => {
        toast.error('Request error ', error)
      })
      .finally(() => navigate('/'))
  }

  if (isLoading) {
    return <Preloader />
  }

  // change key from index to id
  return (
    <div className={styles.historyPage}>
      <h2>Cards you&apos;ve looked at</h2>
      {cardshistory?.length ? (
        <ul className={styles.history}>
          {cardshistory.map((card: any, index) => (
            <li key={index}>
              <Card {...card} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={styles.message}
        >{`You haven't looked at any cards yet`}</p>
      )}

      <h2>Search history</h2>
      {searchHistory?.length ? (
        <ul className={styles.search}>
          {searchHistory.map((link, index) => (
            <li
              className={styles.searchItem}
              key={index}
              onClick={() => handleSearchItem(link.searchValue)}
            >
              {link.searchValue}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={styles.message}
        >{`You haven't searched for anything yet`}</p>
      )}
    </div>
  )
}

export default HistoryPage
