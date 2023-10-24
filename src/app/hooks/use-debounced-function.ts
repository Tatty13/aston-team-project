import { useRef, useEffect } from 'react'

export function useDebouncedFunction(func, delay = 0, cleanUp = false) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp])

  return (...args) => {
    clearTimer()
    timeoutRef.current = setTimeout(() => func(...args), delay)
  }
}
