import { FC } from 'react'

import { Card } from '../Card'
import styles from './CardList.module.scss'
import { ICardListProps } from './CardList.types'

export const CardList: FC<ICardListProps> = ({ cards }) => {
  const cardList = cards.map(({ id, urls, alt_description, liked_by_user }) => (
    <li key={id}>
      <Card
        id={id}
        urls={urls}
        alt_description={alt_description}
        liked_by_user={liked_by_user}
      />
    </li>
  ))
  return <ul className={styles.list}>{cardList}</ul>
}
