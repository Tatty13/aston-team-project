import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocumentData, collection, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { UnsplashApi, UnsplashTypes } from '@api'
import { Card, Preloader } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { authSelectors } from '@store/store'

import { db } from '../../../firebase'
import styles from './History.module.scss'

function HistoryPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [cardshistory, setCardsHistory] = useState<Array<UnsplashTypes.Card>>(
    []
  )
  const [searchHistory, setSearchHistory] = useState<Array<DocumentData>>([])
  const uid = useAppSelector(authSelectors.uid)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(
      collection(db, `users/${uid}/cardsHistory`),
      (snapshot) => {
        const cards = snapshot.docs.map((doc) =>
          doc.data()
        ) as UnsplashTypes.Card[]

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
    <>
      <section className={styles.cardsHistory}>
        <h2>{`Cards you've looked at`}</h2>
        {cardshistory?.length ? (
          <ul className={styles.cardsList}>
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
      </section>
      <section className={styles.searchHistory}>
        <h2>Search history</h2>
        {searchHistory?.length ? (
          <ul className={styles.searchList}>
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
      </section>
    </>
  )
}

export default HistoryPage
