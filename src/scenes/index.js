import Scene09 from './Scene09.jsx'
import Scene10 from './Scene10.jsx'
import Scene11 from './Scene11.jsx'
import Scene12 from './Scene12.jsx'

/**
 * Scene registry for this deck.
 *
 * Only Scene09–Scene12 exist right now; earlier scenes get appended here
 * when they are built, without touching the scene files themselves.
 * `steps` is how many reveal beats a scene has (step 0 = its opening state).
 */
export const SCENES = [
  { id: '09', title: '主題揭露', steps: 6, Component: Scene09 },
  { id: '10', title: 'AI 工作流程', steps: 5, Component: Scene10 },
  { id: '11', title: 'REAL WORK', steps: 5, Component: Scene11 },
  { id: '12', title: '罵得有規格', steps: 6, Component: Scene12 },
]
