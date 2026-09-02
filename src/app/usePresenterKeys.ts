import { useEffect } from 'react'

/**
 * ArrowRight / ArrowLeft drive the deck. Nothing advances on its own —
 * every beat is a deliberate press by the presenter.
 */
export function usePresenterKeys(step: (delta: 1 | -1) => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [step])
}
