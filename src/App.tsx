import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SCENES } from './deck'
import { FilmProvider } from './film/FilmProvider'

const STAGE_W = 1280
const STAGE_H = 720

function useStageScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => {
      const pad = 24
      setScale(
        Math.min(
          (window.innerWidth - pad) / STAGE_W,
          (window.innerHeight - pad) / STAGE_H,
        ),
      )
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
}

export default function App() {
  const scale = useStageScale()
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const indexRef = useRef(index)
  const stepRef = useRef(step)
  indexRef.current = index
  stepRef.current = step

  const next = useCallback(() => {
    const scene = SCENES[indexRef.current]
    if (stepRef.current < scene.steps - 1) setStep((s) => s + 1)
    else if (indexRef.current < SCENES.length - 1) {
      setIndex((i) => i + 1)
      setStep(0)
    }
  }, [])

  const prev = useCallback(() => {
    if (stepRef.current > 0) setStep((s) => s - 1)
    else if (indexRef.current > 0) {
      const target = indexRef.current - 1
      setIndex(target)
      setStep(SCENES[target].steps - 1)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) {
        if (e.key === 'Escape') (e.target as HTMLElement).blur()
        return
      }
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
          e.preventDefault()
          prev()
          break
        case 'Home':
          setIndex(0)
          setStep(0)
          break
        case 'End':
          setIndex(SCENES.length - 1)
          setStep(SCENES[SCENES.length - 1].steps - 1)
          break
        default: {
          // 1..5 jump straight to a scene (14..18).
          const n = Number(e.key)
          if (Number.isInteger(n) && n >= 1 && n <= SCENES.length) {
            setIndex(n - 1)
            setStep(0)
          }
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const scene = SCENES[index]
  const Scene = scene.Component

  return (
    <FilmProvider>
      <div className="deck">
        <div className="stage" style={{ transform: `scale(${scale})` }}>
          <Scene key={scene.id} step={step} steps={scene.steps} />
        </div>
        <div className="deck-help">← → 切換　1–5 跳場</div>
        <div className="deck-hud">
          <span>
            SCENE {14 + index} · {scene.label}
          </span>
          <span className="dots">
            {Array.from({ length: scene.steps }, (_, i) => (
              <i key={i} className={`dot${i <= step ? ' on' : ''}`} />
            ))}
          </span>
        </div>
      </div>
    </FilmProvider>
  )
}
