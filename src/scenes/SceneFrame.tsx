import type { CSSProperties, ReactNode } from 'react';
import { sceneRoot, tokens } from './sceneStyles';

interface SceneFrameProps {
  /** Original artwork from the repo root. Never regenerated, only framed. */
  imageSrc: string;
  /** Where the artwork's subject sits, so text never lands on a face. */
  imagePosition?: string;
  /** Strength of the scrim over the artwork, 0–1. */
  dim?: number;
  /** Optional accent tint pulled from the artwork. */
  accent?: string;
  children: ReactNode;
}

/**
 * Presentational shell shared by Scene05 / Scene06 / Scene08: full-bleed
 * artwork, a readability scrim, and a content layer. It holds no state and
 * knows nothing about beats or navigation.
 */
export function SceneFrame({
  imageSrc,
  imagePosition = 'center',
  dim = 0.72,
  accent = tokens.cyan,
  children,
}: SceneFrameProps): JSX.Element {
  const art: CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: imagePosition,
    filter: 'saturate(0.92)',
  };

  const scrim: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, rgba(6,10,20,${dim + 0.12}) 0%, rgba(6,10,20,${dim}) 42%, rgba(6,10,20,${Math.min(
      dim + 0.2,
      0.96,
    )}) 100%)`,
  };

  const glow: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(120% 80% at 50% 110%, ${accent}1f 0%, transparent 62%)`,
    pointerEvents: 'none',
  };

  const content: CSSProperties = {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 'clamp(28px, 4.2vw, 72px)',
    minHeight: 0,
  };

  return (
    <section style={sceneRoot}>
      <div style={art} aria-hidden="true" />
      <div style={scrim} aria-hidden="true" />
      <div style={glow} aria-hidden="true" />
      <div style={content}>{children}</div>
    </section>
  );
}
