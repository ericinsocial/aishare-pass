import type { ComponentType } from 'react'

/** Props every scene receives from the presenter shell. */
export interface SceneProps {
  /** Zero-based beat index, already clamped to [0, beats - 1]. */
  beat: number
}

/** A scene is a slide made of several beats the presenter steps through. */
export interface Scene {
  /** URL segment, e.g. "01" in #/presenter/01/3 */
  slug: string
  /** Shown only in presenter chrome, never as a website heading. */
  title: string
  /** How many beats this scene has. Always >= 1. */
  beats: number
  view: ComponentType<SceneProps>
}

/** A resolved position inside the deck. */
export interface DeckPosition {
  sceneIndex: number
  beat: number
}
