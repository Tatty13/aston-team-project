import { useEffect, useState } from 'react'

import { UnsplashApi } from '@api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { CardList, Header, Preloader, Search } from '@components'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useAppSelector((state) => state.search)
  const { cardsData } = useAppSelector((state) => state.cards)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true)
      UnsplashApi.searchPhoto({ query: searchValue })
        .then((res) => {
          dispatch(replaceCards(res.results))
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [searchValue, dispatch])

  return (
    <div>
      <Header />
      <h1>Welcome</h1>

      <Search />
      {isLoading && <Preloader />}
      {!isLoading && cardsData.length > 0 && <CardList cards={cardsData} />}
    </div>
  )
}

export { HomePage }
