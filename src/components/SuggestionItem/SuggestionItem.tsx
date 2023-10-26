import { FC } from 'react'
import { Link } from 'react-router-dom'

import { SuggestionItemProps } from './SuggestionItem.types'
import styles from './SuggestionItem.module.scss'

export const SuggestionItem: FC<SuggestionItemProps> = ({
  id,
  alt_description = 'no description',
  thumb,
  owner,
  likes = 0,
}) => {
  return (
    <article className={styles.suggestion}>
      <Link to={`/card?id=${id}`} className={styles.link} />
      <div className={styles.imageWrap}>
        <img src={thumb} alt={alt_description} />
      </div>
      <h2 className={styles.title}>{alt_description}</h2>
      <p className={styles.owner}>{`by ${owner}`}</p>
      <p className={styles.likes}>
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        {likes}
      </p>
      <span className={styles.arrow}>→</span>
    </article>
  )
}
