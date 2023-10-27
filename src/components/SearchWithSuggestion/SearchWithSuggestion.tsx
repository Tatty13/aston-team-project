import { FC, useEffect, useState } from 'react'

import { UnsplashApi } from '@src/app/api'
import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import { replaceCards } from '@src/store/slices/cardsSlice'

import { Search } from '../Search'
import { SuggestionsBar } from '../SuggestionsBar'
import style from './SearchWithSuggestion.module.scss'

export const SearchWithSuggestion: FC = () => {
  const dispatch = useAppDispatch()

  const [isSuggestionsBarVisible, setIsSuggestionsBarVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])

  const { searchValue } = useAppSelector((state) => state.search)

  const handleSubmit = () => {
    setIsSuggestionsBarVisible(false)
    UnsplashApi.searchPhoto({ query: searchValue, per_page: 20 })
      .then((res) => {
        dispatch(replaceCards(res.results))
      })
      .catch(console.log)

    if (localStorage.getItem('history')) {
      const history = JSON.parse(localStorage.getItem('history') || '')
      history.unshift(searchValue)
      localStorage.setItem('history', JSON.stringify(history))
    } else {
      let history: string[] = []
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
