import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { UnsplashApi } from '@api'
import { CardList, Preloader, SearchWithSuggestion } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { usePagination } from '@src/app/hooks/pagination'
import { replaceCards } from '@store/slices/cardsSlice'

import styles from './HomePage.module.scss'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { cardsData } = useAppSelector((state) => state.cards)
  const { countPerPage } = useAppSelector((state) => state.search)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  usePagination()

  useEffect(() => {
    if (!cardsData.length) {
      setIsLoading(true)
      UnsplashApi.getListPhotos({ page: 1, per_page: countPerPage })
        .then((data) => {
          dispatch(replaceCards(data))
        })
        .catch((error) => {
          toast.error('Request error ', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [cardsData.length, dispatch, countPerPage])

  return (
    <div className={styles.wrapper}>
      <SearchWithSuggestion />
      {isLoading && <Preloader />}
      {!isLoading && cardsData.length > 0 && <CardList cards={cardsData} />}
    </div>
  )
}

export { HomePage }
