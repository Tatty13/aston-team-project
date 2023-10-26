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
