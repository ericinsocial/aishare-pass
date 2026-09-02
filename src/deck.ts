import type { ComponentType } from 'react'
import Scene14 from './scenes/Scene14'
import Scene15 from './scenes/Scene15'
import Scene16 from './scenes/Scene16'
import Scene17 from './scenes/Scene17'
import Scene18 from './scenes/Scene18'

export interface SceneProps {
  /** 0-based reveal step inside the scene. */
  step: number
  /** Total steps this scene declares. */
  steps: number
}

export interface SceneDef {
  id: string
  label: string
  steps: number
  Component: ComponentType<SceneProps>
}

/**
 * Scene 13 has no final version and is intentionally absent — this deck owns
 * scenes 14 through 18 only.
 */
export const SCENES: SceneDef[] = [
  { id: 'scene14', label: 'DONE ≠ RIGHT', steps: 9, Component: Scene14 },
  { id: 'scene15', label: '方法論 RECAP', steps: 8, Component: Scene15 },
  { id: 'scene16', label: 'SHOWTIME', steps: 4, Component: Scene16 },
  { id: 'scene17', label: 'AI PRODUCTION ROOM', steps: 1, Component: Scene17 },
  { id: 'scene18', label: 'PREMIERE', steps: 5, Component: Scene18 },
]
