import { FC, useEffect, useState } from 'react'

import { UnsplashApi } from '@src/app/api'
import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { replaceCards } from '@src/store/slices/cardsSlice'
import { setTotalPages } from '@src/store/slices/searchSlice'

import { Search } from '../Search'
import { SuggestionsBar } from '../SuggestionsBar'
import style from './SearchWithSuggestion.module.scss'

export const SearchWithSuggestion: FC = () => {
  const dispatch = useAppDispatch()

  const [isSuggestionsBarVisible, setIsSuggestionsBarVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])

  const { searchValue, countPerPage } = useAppSelector((state) => state.search)

  const handleSubmit = () => {
    setIsSuggestionsBarVisible(false)
    UnsplashApi.searchPhoto({
      query: searchValue,
      per_page: countPerPage,
      page: 1,
    })
      .then(({results, total_pages}) => {
        dispatch(replaceCards(results))
        dispatch(setTotalPages(total_pages))
      })
      .catch(console.log)

    if (localStorage.getItem('history')) {
      const history = JSON.parse(localStorage.getItem('history') || '')
      history.unshift(searchValue)
      localStorage.setItem('history', JSON.stringify(history))
    } else {
      const history: string[] = []
      history.unshift(searchValue || '')
      localStorage.setItem('history', JSON.stringify(history))
    }
  }

  useEffect(() => {
    if (searchValue) {
      UnsplashApi.getRandomPhoto({ count: 5, query: searchValue })
        .then((data) => {
          setSuggestions(data)
          setIsSuggestionsBarVisible(true)
        })
        .catch(console.log)
    }
  }, [searchValue])

  useEffect(() => {
    const closeSuggestionsBar = (evt: MouseEvent) => {
      if (
        isSuggestionsBarVisible &&
        !(evt.target as HTMLElement).closest('section')
      )
        setIsSuggestionsBarVisible(false)
    }

    if (isSuggestionsBarVisible) {
      document.addEventListener('click', closeSuggestionsBar)
    }

    return () => {
      document.removeEventListener('click', closeSuggestionsBar)
    }
  }, [isSuggestionsBarVisible])

  return (
    <section className={style.section}>
      <Search onSubmit={handleSubmit} />
      <SuggestionsBar
        photos={suggestions}
        visible={isSuggestionsBarVisible && searchValue.length > 0}
      />
    </section>
  )
}
