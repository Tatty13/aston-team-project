import { useEffect, useState } from 'react'

import { UnsplashApi } from '@api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { CardList, Preloader, SearchWithSuggestion } from '@components'
import { usePagination } from '@src/app/hooks/pagination'

import styles from './HomePage.module.scss'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { cardsData } = useAppSelector((state) => state.cards)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  usePagination()

  useEffect(() => {
    if (!cardsData.length) {
      setIsLoading(true)
      UnsplashApi.getRandomPhoto({ count: 20 })
        .then((data) => {
          dispatch(replaceCards(data))
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [cardsData.length, dispatch])

  return (
    <div className={styles.wrapper}>
      <SearchWithSuggestion />
      {isLoading && <Preloader />}
      {!isLoading && cardsData.length > 0 && <CardList cards={cardsData} />}
    </div>
  )
}

export { HomePage }