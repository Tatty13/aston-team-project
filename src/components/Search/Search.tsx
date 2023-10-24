import { FC, useRef, useState } from 'react'

import { useAppDispatch, useDebouncedFunction } from '../../app/hooks'
import { setSearchValue } from '../../store/slices/searchSlice'

import { CloseIcon } from '../ui/CloseIcon/CloseIcon'
import styles from './Search.module.scss'

export const Search: FC = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDebouncedInputUpdate = useDebouncedFunction(
    (str: string) => dispatch(setSearchValue(str)),
    1000,
    true
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    handleDebouncedInputUpdate(e.target.value)
  }

  function handleClearClick() {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        ref={inputRef}
        value={value}
        placeholder='Find a photo for you'
        onChange={handleChange}
      />
      {value && (
        <button
          className={styles.clearBtn}
          type='button'
          aria-label='clear input'
          onClick={handleClearClick}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
