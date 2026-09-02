import type { ReactNode } from 'react'

/**
 * Coordinate-space adapter for Scene 14–18.
 *
 * Those scenes were composed against a 1280x720 canvas, while the deck's
 * <Stage /> is 1920x1080. The canvas is pinned to the stage origin and scaled
 * by exactly 1.5 (1280 x 1.5 = 1920, 720 x 1.5 = 1080), so the composition
 * lands on stage pixel-for-pixel — nothing is re-laid-out, only enlarged.
 *
 * The .deck1418 class also carries this group's colour tokens, keeping them
 * off :root so Scene 01–08 keep the stage palette from global.css.
 */
export function Deck1418Frame({ children }: { children: ReactNode }) {
  return (
    <div className="deck1418">
      <div className="deck1418__canvas">{children}</div>
    </div>
  )
}
