import type { DeckPosition, Scene } from '../types/scene'

/**
 * Presenter URLs look like:  #/presenter/:scene/:beat
 * Hash routing only — no server rewrite, so a static host (GitHub Pages)
 * can serve the build as-is.
 */
export const PRESENTER_PREFIX = '#/presenter'

export function buildHash(scenes: Scene[], position: DeckPosition): string {
  const scene = scenes[position.sceneIndex]
  return `${PRESENTER_PREFIX}/${scene.slug}/${position.beat}`
}

/** Clamp an arbitrary position onto a real slot in the deck. */
export function clampPosition(scenes: Scene[], position: DeckPosition): DeckPosition {
  const sceneIndex = Math.min(Math.max(position.sceneIndex, 0), scenes.length - 1)
  const beat = Math.min(Math.max(position.beat, 0), scenes[sceneIndex].beats - 1)
  return { sceneIndex, beat }
}

/**
 * Parse a location hash into a deck position.
 * Returns null when the hash does not address a known scene, so the caller
 * can redirect to the first beat of the deck.
 */
export function parseHash(scenes: Scene[], hash: string): DeckPosition | null {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (parts[0] !== 'presenter' || parts.length < 2) return null

  const sceneIndex = scenes.findIndex((scene) => scene.slug === parts[1])
  if (sceneIndex === -1) return null

  const beat = Number.parseInt(parts[2] ?? '0', 10)
  return clampPosition(scenes, {
    sceneIndex,
    beat: Number.isFinite(beat) ? beat : 0,
  })
}

/**
 * Move one beat forward (+1) or backward (-1). Stepping past the last beat
 * of a scene rolls into the next scene, and vice versa. The ends of the deck
 * are hard stops — the presenter never falls off the edge mid-talk.
 */
export function stepBeat(
  scenes: Scene[],
  position: DeckPosition,
  delta: 1 | -1,
): DeckPosition {
  const beat = position.beat + delta

  if (beat >= 0 && beat < scenes[position.sceneIndex].beats) {
    return { sceneIndex: position.sceneIndex, beat }
  }

  const sceneIndex = position.sceneIndex + delta
  if (sceneIndex < 0 || sceneIndex >= scenes.length) return position

  return {
    sceneIndex,
    beat: delta === 1 ? 0 : scenes[sceneIndex].beats - 1,
  }
}
