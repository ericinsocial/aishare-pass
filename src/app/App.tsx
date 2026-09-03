import { useCallback } from 'react'
import { PresenterChrome } from '../components/PresenterChrome'
import { Stage } from '../components/Stage'
import { scenes } from '../scenes'
import { stepBeat } from './routes'
import { useDeckRoute } from './useDeckRoute'
import { usePresenterKeys } from './usePresenterKeys'

export function App() {
  const { position, goTo } = useDeckRoute(scenes)

  const step = useCallback(
    (delta: 1 | -1) => goTo(stepBeat(scenes, position, delta)),
    [goTo, position],
  )
  usePresenterKeys(step)

  const scene = scenes[position.sceneIndex]
  const SceneView = scene.view

  return (
    <Stage>
      <SceneView beat={position.beat} />
      <PresenterChrome beat={position.beat} beats={scene.beats} />
    </Stage>
  )
}
