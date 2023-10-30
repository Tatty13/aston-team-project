import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Card, Preloader } from '@src/components'
import { UnsplashApi } from '@src/app/api'
import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { replaceCards } from '@src/store/slices/cardsSlice'

import { authSelectors } from '@src/store'
import { collection, onSnapshot } from 'firebase/firestore'

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
      .catch(console.log)
      .finally(() => navigate('/'))
  }

  // change key from index to id
  return (
    <>
      {isLoading && <Preloader />}
      <div className={styles.historyPage}>
        <h2>Cards you&apos;ve looked at</h2>
        <ul className={styles.history}>
          {cardshistory &&
            cardshistory.map((card: any, index) => (
              <li key={index}>
                <Card {...card} />
              </li>
            ))}
        </ul>

        <h2>Search history</h2>
        <ul className={styles.search}>
          {searchHistory &&
            searchHistory.map((link, index) => (
              <li
                className={styles.searchItem}
                key={index}
                onClick={() => handleSearchItem(link.searchValue)}
              >
                {link.searchValue}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default HistoryPage
