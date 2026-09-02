import { useCallback, useEffect, useState } from 'react'
import Stage from './components/Stage.jsx'
import { SCENES } from './scenes/index.js'

export default function Deck() {
  const [pos, setPos] = useState({ scene: 0, step: 0 })

  const next = useCallback(() => {
    setPos(({ scene, step }) => {
      if (step < SCENES[scene].steps - 1) return { scene, step: step + 1 }
      if (scene < SCENES.length - 1) return { scene: scene + 1, step: 0 }
      return { scene, step }
    })
  }, [])

  const prev = useCallback(() => {
    setPos(({ scene, step }) => {
      if (step > 0) return { scene, step: step - 1 }
      if (scene > 0) return { scene: scene - 1, step: SCENES[scene - 1].steps - 1 }
      return { scene, step }
    })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault()
          prev()
          break
        case 'Home':
          setPos({ scene: 0, step: 0 })
          break
        case 'f':
        case 'F':
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen?.()
          break
        default:
          // 1..4 jump straight to a scene
          if (/^[1-9]$/.test(e.key)) {
            const i = Number(e.key) - 1
            if (i < SCENES.length) setPos({ scene: i, step: 0 })
          }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onClick = (e) => {
    if (e.clientX < window.innerWidth * 0.18) prev()
    else next()
  }

  const current = SCENES[pos.scene]
  const { Component } = current

  return (
    <div onClick={onClick}>
      <Stage>
        <Component step={pos.step} />

        <div className="deck-nav">
          <span>{current.id}</span>
          <div className="deck-dots">
            {Array.from({ length: current.steps }, (_, i) => (
              <span
                key={i}
                className={[
                  'deck-dot',
                  i === pos.step ? 'is-current' : '',
                  i < pos.step ? 'is-done' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
        </div>

        <div className="deck-hint">← / → 切換　F 全螢幕</div>
      </Stage>
    </div>
  )
}
