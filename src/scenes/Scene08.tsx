import type { CSSProperties } from 'react';
import { SceneFrame } from './SceneFrame';
import type { SceneProps } from './types';
import { clampBeat, eyebrow, reveal, tokens } from './sceneStyles';

/**
 * Scene 08 — IDEA → REALITY
 *
 * 💡 想 → 💬 說 → ⚙️ 做 → 👀 看 → 🔁 改
 *
 * The loop is the payload, so the flow is *built*, never dumped: one step per
 * beat, then the return arrow from 改 back to 說, then the line the audience
 * should leave with — 只要有想法，就試著把它實現。
 *
 * Beats
 *  0            標題 IDEA → REALITY
 *  1 – 5        五個步驟逐步建立（第 5 拍同時帶出回圈）
 *  6            收斂：只要有想法，就試著把它實現
 */
export const beats = 7;

const FIRST_STEP_BEAT = 1;

interface Step {
  icon: string;
  label: string;
  en: string;
  note: string;
}

const STEPS: Step[] = [
  { icon: '💡', label: '想', en: 'Idea', note: '先有一個想法，不用完美' },
  { icon: '💬', label: '說', en: 'Say', note: '用自己的話講給 AI 聽' },
  { icon: '⚙️', label: '做', en: 'Build', note: '讓它先做出一版來' },
  { icon: '👀', label: '看', en: 'Look', note: '看看跟你想的差多少' },
  { icon: '🔁', label: '改', en: 'Refine', note: '講出差在哪，再來一次' },
];

export default function Scene08({ beat, imageSrc = '/08.png' }: SceneProps): JSX.Element {
  const b = clampBeat(beat, beats);
  const shownSteps = Math.max(0, Math.min(STEPS.length, b - FIRST_STEP_BEAT + 1));
  const loopOn = shownSteps >= STEPS.length;
  const closing = b >= 6;

  const flowRow: CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 'clamp(4px, 0.6vw, 12px)',
  };

  const card = (on: boolean, newest: boolean): CSSProperties => ({
    ...reveal(on, { y: 26, scale: 0.94 }),
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'clamp(4px, 0.5vw, 9px)',
    padding: 'clamp(12px, 1.5vw, 26px) clamp(8px, 1vw, 18px)',
    borderRadius: 16,
    textAlign: 'center',
    background: newest ? 'rgba(255, 181, 71, 0.12)' : tokens.panel,
    border: `1px solid ${newest ? tokens.amber : tokens.panelEdge}`,
    boxShadow: newest ? `0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px ${tokens.amber}33` : 'none',
  });

  return (
    <SceneFrame imageSrc={imageSrc} imagePosition="center 38%" dim={0.8} accent={tokens.amber}>
      <div style={{ marginBottom: 'clamp(12px, 1.6vw, 26px)' }}>
        <span style={eyebrow}>Scene · Idea to Reality</span>
      </div>

      <div
        style={{
          ...reveal(b >= 0, { y: 16 }),
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 1.6vw, 28px)',
          marginBottom: 'clamp(16px, 2.2vw, 40px)',
        }}
      >
        <span style={{ fontSize: 'clamp(28px, 3.4vw, 58px)', fontWeight: 900, letterSpacing: '0.02em' }}>
          IDEA
        </span>
        <span aria-hidden="true" style={{ color: tokens.amber, fontSize: 'clamp(24px, 2.8vw, 48px)' }}>
          →
        </span>
        <span
          style={{
            fontSize: 'clamp(28px, 3.4vw, 58px)',
            fontWeight: 900,
            letterSpacing: '0.02em',
            color: tokens.amber,
          }}
        >
          REALITY
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
        <div style={flowRow}>
          {STEPS.map((step, i) => {
            const on = i < shownSteps;
            const newest = on && i === shownSteps - 1 && !closing;
            return (
              <div key={step.label} style={{ display: 'contents' }}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      ...reveal(on, { y: 0, scale: 0.7 }),
                      alignSelf: 'center',
                      flex: '0 0 auto',
                      color: tokens.amber,
                      fontSize: 'clamp(16px, 1.7vw, 30px)',
                      fontWeight: 900,
                      padding: '0 clamp(2px, 0.3vw, 8px)',
                    }}
                  >
                    →
                  </span>
                )}
                <div style={card(on, newest)}>
                  <span style={{ fontSize: 'clamp(24px, 2.7vw, 46px)', lineHeight: 1 }} aria-hidden="true">
                    {step.icon}
                  </span>
                  <span style={{ fontSize: 'clamp(20px, 2.1vw, 38px)', fontWeight: 900, lineHeight: 1.1 }}>
                    {step.label}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(9px, 0.8vw, 13px)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: tokens.inkFaint,
                      fontWeight: 700,
                    }}
                  >
                    {step.en}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(11px, 1.02vw, 18px)',
                      lineHeight: 1.45,
                      color: newest ? tokens.ink : tokens.inkMuted,
                    }}
                  >
                    {step.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Return arrow: 改 loops back to 說. Appears only once the flow is complete. */}
        <div
          style={{
            ...reveal(loopOn, { y: -10 }),
            position: 'relative',
            width: '60%',
            marginLeft: '30%',
            marginRight: '10%',
            marginTop: 'clamp(2px, 0.4vw, 8px)',
            height: 'clamp(46px, 4.4vw, 76px)',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '62%',
              borderLeft: `2px dashed ${tokens.amber}`,
              borderRight: `2px dashed ${tokens.amber}`,
              borderBottom: `2px dashed ${tokens.amber}`,
              borderRadius: '0 0 26px 26px',
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: -7,
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: `10px solid ${tokens.amber}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              padding: '3px clamp(8px, 0.9vw, 16px)',
              borderRadius: 999,
              background: tokens.bg,
              border: `1px solid ${tokens.amber}`,
              color: tokens.amber,
              fontSize: 'clamp(11px, 0.98vw, 17px)',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            不滿意？回去再說一次就好
          </div>
        </div>
      </div>

      <div
        style={{
          ...reveal(closing, { y: 18 }),
          marginTop: 'clamp(12px, 1.6vw, 28px)',
          paddingTop: 'clamp(12px, 1.5vw, 24px)',
          borderTop: `1px solid ${tokens.panelEdge}`,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(22px, 2.4vw, 42px)',
            fontWeight: 900,
            color: tokens.amber,
            letterSpacing: '0.01em',
          }}
        >
          只要有想法，就試著把它實現
        </span>
      </div>
    </SceneFrame>
  );
}
