import { useEffect, useState } from 'react'

const DESIGN_W = 1920
const DESIGN_H = 1080

/**
 * Letterboxes a fixed 1920x1080 design canvas into whatever the projector
 * gives us, so type sizes stay exactly where they were designed.
 */
export default function Stage({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () =>
      setScale(
        Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H),
      )
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="stage-fit">
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
