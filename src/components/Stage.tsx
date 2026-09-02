import { useEffect, useState, type ReactNode } from 'react'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

/**
 * Fixed 16:9 presentation viewport.
 * Scenes are authored against a 1920x1080 canvas and the whole canvas is
 * scaled to fit whatever projector it lands on, so type sizes and spacing
 * stay exactly as composed.
 */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => {
      setScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      )
    }

    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])

  return (
    <div className="stage-viewport">
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
