import { FC, useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { UnsplashApi, UnsplashTypes } from '@api'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { authSelectors } from '@store/store'
import { setTotalPages } from '@store/slices/searchSlice'

import { db } from '../../../firebase'

import { Search } from '../Search'
import { SuggestionsBar } from '../SuggestionsBar'
import style from './SearchWithSuggestion.module.scss'

export const SearchWithSuggestion: FC = () => {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(authSelectors.uid)

  const [isSuggestionsBarVisible, setIsSuggestionsBarVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<UnsplashTypes.Card[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isAuth } = useAuth()

  const { searchValue, countPerPage } = useAppSelector((state) => state.search)

  const handleSubmit = async (searchValue) => {
    setIsSuggestionsBarVisible(false)
    UnsplashApi.searchPhoto({
      query: searchValue,
      per_page: countPerPage,
      page: 1,
    })
      .then(({ results, total_pages }) => {
        dispatch(replaceCards(results))
        dispatch(setTotalPages(total_pages))
      })
      .catch((error) => {
        toast.error('Request error ', error)
      })

    if (isAuth) {
      try {
        await setDoc(doc(db, `users/${uid}/searchHistory`, searchValue), {
          searchValue,
        })
      } catch (error: string | any) {
        toast.error('Error adding a search parameter ', error)
      }
    }
  }

  const handleSuggestionError = (err) => {
    const message =
      typeof err === 'string'
        ? err
        : 'An error occurred during the request. Please try again later.'
    setErrorMessage(message)
    setSuggestions([])
  }

  useEffect(() => {
    setErrorMessage('')
    if (searchValue) {
      UnsplashApi.getRandomPhoto({ count: 5, query: searchValue })
        .then((data) => {
          setSuggestions(data as UnsplashTypes.Card[])
        })
        .catch(handleSuggestionError)
        .finally(() => setIsSuggestionsBarVisible(true))
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
        errorMessage={errorMessage}
      />
    </section>
  )
}
