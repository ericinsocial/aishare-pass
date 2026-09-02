import type { CSSProperties, ReactNode } from 'react'

type From = 'up' | 'down' | 'left' | 'scale' | 'none'

interface RevealProps {
  show: boolean
  from?: From
  /** Stagger inside a single beat, in ms. Applied on the way in only. */
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Beat-driven visibility. Both directions animate, so stepping backwards
 * looks as intentional as stepping forwards.
 */
export function Reveal({
  show,
  from = 'up',
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  return (
    <div
      className={['reveal', show ? 'is-on' : '', className ?? ''].join(' ').trim()}
      data-from={from}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
