import { FC } from 'react'

import { SuggestionItem } from '../SuggestionItem'
import { SuggestionsBarProps } from './SuggestionsBar.types'
import styles from './SuggestionsBar.module.scss'

export const SuggestionsBar: FC<SuggestionsBarProps> = ({
  photos,
  visible,
  errorMessage = '',
}) => {
  const suggestionsList = photos.map(
    ({ id, alt_description, urls, user, likes }) => (
      <li key={id}>
        <SuggestionItem
          id={id}
          alt_description={alt_description}
          thumb={urls.thumb}
          owner={user.name}
          likes={likes}
        />
      </li>
    )
  )

  return (
    <div
      className={`${styles.bar} ${visible && styles.visible}`}
      id='bar'
      aria-label='Suggestions Bar'
    >
      {errorMessage ? (
        <p className={styles.message}>{errorMessage}</p>
      ) : (
        <ul className={styles.list}>{suggestionsList}</ul>
      )}
    </div>
  )
}
