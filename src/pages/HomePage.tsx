import { useEffect, useState } from 'react'

import { UnsplashApi } from '@api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { replaceCards } from '@store/slices/cardsSlice'
import { CardList, Header, Preloader, SearchWithSuggestion } from '@components'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { cardsData } = useAppSelector((state) => state.cards)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    <>
      <Header />
      <h1>Welcome</h1>
      <SearchWithSuggestion />
      {isLoading && <Preloader />}
      {!isLoading && cardsData.length > 0 && <CardList cards={cardsData} />}
    </>
  )
}

export { HomePage }
