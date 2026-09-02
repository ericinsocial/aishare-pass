import type { CSSProperties, ReactNode } from 'react'

/** Tags the Scene09–12 reveals actually render as. */
type RiseTag = 'div' | 'h1' | 'h2' | 'p'

interface RiseProps {
  show: boolean
  /** Stagger inside a single beat, in ms. */
  delay?: number
  /** Space-separated modifiers, e.g. "pop" or "left blur". */
  variant?: string
  as?: RiseTag
  className?: string
  children?: ReactNode
}

/**
 * The reveal primitive Scene09–Scene12 are built from: an element that
 * animates in once `show` flips true.
 *
 * Kept separate from the shared <Reveal /> because these scenes need a
 * polymorphic tag (headings and paragraphs, not just divs) and combined
 * modifiers, neither of which <Reveal />'s single `from` prop expresses.
 */
export default function Rise({
  show,
  delay = 0,
  variant = '',
  as: Tag = 'div',
  className = '',
  children,
}: RiseProps) {
  const variants = variant
    .split(' ')
    .filter(Boolean)
    .map((v) => `rise--${v}`)
    .join(' ')

  return (
    <Tag
      className={['rise', variants, show ? 'on' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
