import { useEffect } from 'react'

import { UnsplashApi } from '../app/api'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { CardList } from '../components/CardList'
import Header from '../components/Header/Header'
import { Search } from '../components/Search'
import { replaceCards } from '../store/slices/cardsSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useAppSelector((state) => state.search)
  const { cardsData } = useAppSelector((state) => state.cards)

  useEffect(() => {
    if (searchValue) {
      UnsplashApi.searchPhoto({ query: searchValue })
        .then((res) => {
          dispatch(replaceCards(res.results))
        })
        .catch((err) => console.log(err))
    }
  }, [searchValue, dispatch])

  return (
    <div>
      <Header />
      <h1>Welcome</h1>

      <Search />
      {cardsData.length > 0 && <CardList cards={cardsData} />}
    </div>
  )
}

export default HomePage
