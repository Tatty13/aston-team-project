import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@src/components'
import { UnsplashApi } from '@src/app/api'
import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { replaceCards } from '@src/store/slices/cardsSlice'

import styles from './History.module.scss'

function HistoryPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [cardshistory, setCardsHistory] = useState([])
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    if (localStorage.getItem('cardshistory')) {
      setCardsHistory(JSON.parse(localStorage.getItem('cardshistory')!))
    }

    if (localStorage.getItem('history')) {
      setSearchHistory(JSON.parse(localStorage.getItem('history')!))
    }
  }, [])

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
              onClick={() => handleSearchItem(link)}
            >
              {link}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default HistoryPage
