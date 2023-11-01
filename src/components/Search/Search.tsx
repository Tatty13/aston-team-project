import { FC, useEffect, useRef, useState } from 'react'

import { useAppDispatch, useDebouncedFunction } from '@hooks'
import { resetSearch, setSearchValue } from '@store/slices/searchSlice'

import { CloseIcon, SearchIcon } from '../ui'
import { SearchProps } from './Search.types'
import styles from './Search.module.scss'

export const Search: FC<SearchProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDebouncedInputUpdate = useDebouncedFunction(
    (str: string) => dispatch(setSearchValue(str)),
    500,
    true
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    handleDebouncedInputUpdate(e.target.value)
  }

  function handleClearClick() {
    setValue('')
    dispatch(resetSearch())
    inputRef.current?.focus()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onSubmit(value)
  }

  useEffect(
    () => () => {
      dispatch(resetSearch())
    },
    [dispatch]
  )

  return (
    <form className={styles.search} onSubmit={handleSubmit} name='search'>
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
      <button
        type='submit'
        className={styles.submitBtn}
        disabled={!value.length}
        aria-label='Search'
      >
        <SearchIcon />
      </button>
    </form>
  )
}
