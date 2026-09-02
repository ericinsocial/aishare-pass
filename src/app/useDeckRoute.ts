import { useCallback, useEffect, useState } from 'react'
import type { DeckPosition, Scene } from '../types/scene'
import { buildHash, parseHash } from './routes'

const START: DeckPosition = { sceneIndex: 0, beat: 0 }

/**
 * Keeps the deck position in sync with the location hash.
 * Navigation writes the hash instead of re-rendering the document, so a beat
 * change never reloads the page — critical when projecting live.
 */
export function useDeckRoute(scenes: Scene[]) {
  const [position, setPosition] = useState<DeckPosition>(
    () => parseHash(scenes, window.location.hash) ?? START,
  )

  useEffect(() => {
    const sync = () => {
      const next = parseHash(scenes, window.location.hash) ?? START
      const canonical = buildHash(scenes, next)

      // Unknown scene or an out-of-range beat: rewrite the address bar to the
      // slot actually on screen, without pushing a history entry.
      if (window.location.hash !== canonical) {
        window.location.replace(canonical)
        return
      }
      setPosition(next)
    }

    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [scenes])

  const goTo = useCallback(
    (next: DeckPosition) => {
      const hash = buildHash(scenes, next)
      if (window.location.hash !== hash) window.location.hash = hash
    },
    [scenes],
  )

  return { position, goTo }
}
