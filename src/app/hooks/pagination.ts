import { useCallback, useEffect, useState } from 'react'

import { UnsplashApi } from '@api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { addMoreCards } from '@store/slices/cardsSlice'

export function usePagination() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(2)
  const [fetching, setFetching] = useState<boolean>(false)
  const { searchValue, countPerPage, totalPages } = useAppSelector(
    (state) => state.search
  )

  const getPhotos = useCallback(async () => {
    let photos: string[]

    if (!searchValue) {
      photos = await UnsplashApi.getListPhotos({
        page: currentPage,
        per_page: countPerPage,
      })
    } else {
      const { results } = await UnsplashApi.searchPhoto({
        query: searchValue,
        page: currentPage,
        per_page: countPerPage,
      })
      photos = results
    }

    dispatch(addMoreCards(photos))
    setCurrentPage((prevState) => prevState + 1)
    setFetching(false)
  }, [dispatch, currentPage, searchValue, countPerPage])

  useEffect(() => {
    if (fetching) {
      if (totalPages && totalPages < currentPage) {
        setFetching(false)
        return
      }

      getPhotos()
    }
  }, [fetching, getPhotos, currentPage, totalPages])

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
