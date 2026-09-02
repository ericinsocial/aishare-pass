import type { CSSProperties } from 'react';

/**
 * Design tokens shared by Scene05 / Scene06 / Scene08 so the three slides read
 * as one family. Kept deliberately small and local — this is not a design
 * system, just the handful of values these three scenes agree on.
 */
export const tokens = {
  bg: '#060a14',
  ink: '#f2f6ff',
  inkMuted: 'rgba(242, 246, 255, 0.66)',
  inkFaint: 'rgba(242, 246, 255, 0.42)',
  cyan: '#6fe3ff',
  amber: '#ffb547',
  panel: 'rgba(8, 14, 26, 0.72)',
  panelEdge: 'rgba(111, 227, 255, 0.22)',
  font:
    '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Hiragino Sans", system-ui, -apple-system, sans-serif',
  ease: 'cubic-bezier(0.22, 0.72, 0.26, 1)',
} as const;

/** Clamp a presenter-supplied beat into the range a scene actually has. */
export function clampBeat(beat: number, beats: number): number {
  if (!Number.isFinite(beat)) return 0;
  return Math.min(Math.max(Math.trunc(beat), 0), beats - 1);
}

/**
 * Enter/exit style for one revealed element.
 *
 * The transition is driven purely by the `beat` prop changing, so stepping
 * backwards with the left arrow key animates out again. No timers, no
 * autoplay — the presenter is the only clock.
 */
export function reveal(
  visible: boolean,
  options: { y?: number; x?: number; scale?: number; delayMs?: number } = {},
): CSSProperties {
  const { y = 22, x = 0, scale = 1, delayMs = 0 } = options;
  const hidden = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translate3d(0, 0, 0) scale(1)' : hidden,
    transition: `opacity 420ms ${tokens.ease} ${visible ? delayMs : 0}ms, transform 460ms ${tokens.ease} ${
      visible ? delayMs : 0
    }ms`,
    willChange: 'opacity, transform',
  };
}

/** Root box every scene in this folder fills. */
export const sceneRoot: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: tokens.bg,
  color: tokens.ink,
  fontFamily: tokens.font,
  display: 'flex',
  flexDirection: 'column',
};

export const eyebrow: CSSProperties = {
  fontSize: 'clamp(11px, 1.05vw, 16px)',
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: tokens.cyan,
  fontWeight: 700,
};
