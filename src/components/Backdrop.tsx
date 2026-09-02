import type { CSSProperties } from 'react'

interface BackdropProps {
  src: string
  alt: string
  show: boolean
  /** 0 = image at full strength, 1 = fully veiled by the stage black. */
  veil?: number
}

/** Full-bleed scene image, dimmed so the type stays the loudest thing on stage. */
export function Backdrop({ src, alt, show, veil = 0.55 }: BackdropProps) {
  return (
    <div
      className={`backdrop${show ? ' is-on' : ''}`}
      style={{ '--backdrop-veil': `rgba(5, 5, 10, ${veil})` } as CSSProperties}
    >
      <img src={src} alt={alt} draggable={false} />
    </div>
  )
}
