import { useEffect, useState } from 'react'
import { getListPhotos } from '../../app/api/unsplash'
import { useAppDispatch } from './redux-hooks'
import { addMoreCards } from '@src/store/slices/cardsSlice'

export function usePagination() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [fetching, setFetching] = useState<boolean>(false)

  useEffect(() => {
    if (fetching) {
      const getPhotos = async () => {
        const photo = await getListPhotos({ page: currentPage, per_page: 20 })
        console.log(photo)
        dispatch(addMoreCards(photo))
        setCurrentPage((prevState) => prevState + 1)
        setFetching(false)
      }
      getPhotos()
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true)
    }
  }
}
