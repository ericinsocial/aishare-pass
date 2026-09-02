import type { CSSProperties } from 'react';
import { SceneFrame } from './SceneFrame';
import type { SceneProps } from './types';
import { clampBeat, eyebrow, reveal, tokens } from './sceneStyles';

/**
 * Scene 05 — Prompt 五大元素
 *
 * The point of this slide is *not* to teach a prompt formula. The five
 * elements are a checklist you run against yourself — "我是不是漏講什麼？" —
 * so they arrive one at a time rather than as a wall of five boxes.
 *
 * Beats
 *  0            標題 +「五大元素不是 Prompt 公式」
 *  1            「而是一張『我是不是漏講什麼？』的 Checklist」
 *  2 – 6        五大元素逐項進場（一次一項）
 *  7            收斂：不是每次都寫五段，而是回頭檢查有沒有漏掉
 */
export const beats = 8;

const FIRST_ITEM_BEAT = 2;

interface ElementItem {
  index: string;
  name: string;
  en: string;
  ask: string;
}

const ELEMENTS: ElementItem[] = [
  {
    index: '01',
    name: '角色',
    en: 'Role',
    ask: '我有沒有說，我要它站在什麼角度回答我？',
  },
  {
    index: '02',
    name: '任務',
    en: 'Task',
    ask: '我有沒有說清楚，我到底要它做出什麼？',
  },
  {
    index: '03',
    name: '脈絡',
    en: 'Context',
    ask: '我有沒有給背景？它憑什麼知道我的狀況？',
  },
  {
    index: '04',
    name: '限制',
    en: 'Constraints',
    ask: '我有沒有講「不要什麼」？長度、語氣、禁區？',
  },
  {
    index: '05',
    name: '格式',
    en: 'Format',
    ask: '我有沒有說我要什麼形狀？表格、條列，還是一段話？',
  },
];

export default function Scene05({ beat, imageSrc = '/05.png' }: SceneProps): JSX.Element {
  const b = clampBeat(beat, beats);
  const revealedCount = Math.max(0, Math.min(ELEMENTS.length, b - FIRST_ITEM_BEAT + 1));
  const closing = b >= 7;

  const columns: CSSProperties = {
    display: 'flex',
    gap: 'clamp(24px, 3.4vw, 60px)',
    flex: 1,
    minHeight: 0,
    alignItems: 'stretch',
  };

  const left: CSSProperties = {
    flex: '0 0 34%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(12px, 1.4vw, 22px)',
  };

  const headline: CSSProperties = {
    fontSize: 'clamp(26px, 3.1vw, 52px)',
    fontWeight: 900,
    lineHeight: 1.22,
    letterSpacing: '-0.01em',
    margin: 0,
  };

  const subhead: CSSProperties = {
    fontSize: 'clamp(16px, 1.55vw, 27px)',
    lineHeight: 1.5,
    color: tokens.inkMuted,
    margin: 0,
    fontWeight: 500,
  };

  const list: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(8px, 0.95vw, 16px)',
    minWidth: 0,
  };

  return (
    <SceneFrame imageSrc={imageSrc} imagePosition="center 42%" dim={0.78}>
      <div style={{ ...reveal(true), marginBottom: 'clamp(14px, 1.8vw, 30px)' }}>
        <span style={eyebrow}>Prompt · 五大元素</span>
      </div>

      <div style={columns}>
        <div style={left}>
          <p style={{ ...headline, ...reveal(b >= 0, { y: 18 }) }}>
            五大元素
            <br />
            <span
              style={{
                color: 'rgba(242, 246, 255, 0.5)',
                textDecorationLine: 'line-through',
                textDecorationColor: tokens.amber,
                textDecorationThickness: '4px',
              }}
            >
              不是 Prompt 公式
            </span>
          </p>

          <p style={{ ...subhead, ...reveal(b >= 1, { y: 16 }) }}>
            而是一張
            <span
              style={{
                color: tokens.cyan,
                fontWeight: 800,
                borderBottom: `2px solid ${tokens.cyan}`,
                padding: '0 2px',
                margin: '0 4px',
              }}
            >
              「我是不是漏講什麼？」
            </span>
            的 Checklist
          </p>

          <div
            style={{
              ...reveal(b >= 1, { y: 12, delayMs: 90 }),
              marginTop: 'clamp(6px, 0.8vw, 14px)',
              fontSize: 'clamp(12px, 1.05vw, 18px)',
              color: tokens.inkFaint,
              letterSpacing: '0.04em',
            }}
          >
            {revealedCount} / {ELEMENTS.length} 項已檢查
          </div>
        </div>

        <div style={list}>
          {ELEMENTS.map((item, i) => {
            const on = i < revealedCount;
            const isNewest = on && i === revealedCount - 1;
            return (
              <div
                key={item.index}
                style={{
                  ...reveal(on, { y: 20, x: 26 }),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(12px, 1.3vw, 22px)',
                  padding: 'clamp(10px, 1.15vw, 20px) clamp(14px, 1.5vw, 26px)',
                  borderRadius: 14,
                  background: isNewest ? 'rgba(111, 227, 255, 0.10)' : tokens.panel,
                  border: `1px solid ${isNewest ? tokens.cyan : tokens.panelEdge}`,
                  boxShadow: isNewest ? `0 0 0 1px ${tokens.cyan}33, 0 14px 34px rgba(0,0,0,0.4)` : 'none',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: '0 0 auto',
                    width: 'clamp(22px, 2.1vw, 34px)',
                    height: 'clamp(22px, 2.1vw, 34px)',
                    borderRadius: 8,
                    border: `2px solid ${on ? tokens.cyan : tokens.inkFaint}`,
                    color: tokens.bg,
                    background: on ? tokens.cyan : 'transparent',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 'clamp(13px, 1.25vw, 20px)',
                    fontWeight: 900,
                    transition: `background 320ms ${tokens.ease}, border-color 320ms ${tokens.ease}`,
                  }}
                >
                  ✓
                </span>

                <span
                  style={{
                    flex: '0 0 auto',
                    width: 'clamp(96px, 9.4vw, 156px)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'clamp(18px, 1.75vw, 30px)',
                      fontWeight: 900,
                      lineHeight: 1.15,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'clamp(9px, 0.76vw, 13px)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: tokens.inkFaint,
                      fontWeight: 700,
                    }}
                  >
                    {item.index} · {item.en}
                  </span>
                </span>

                <span
                  style={{
                    fontSize: 'clamp(13px, 1.2vw, 21px)',
                    lineHeight: 1.45,
                    color: isNewest ? tokens.ink : tokens.inkMuted,
                  }}
                >
                  {item.ask}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          ...reveal(closing, { y: 18 }),
          marginTop: 'clamp(14px, 1.8vw, 30px)',
          borderTop: `1px solid ${tokens.panelEdge}`,
          paddingTop: 'clamp(12px, 1.5vw, 24px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: 'clamp(8px, 1.1vw, 20px)',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(15px, 1.4vw, 25px)',
            color: tokens.inkFaint,
            textDecoration: 'line-through',
            fontWeight: 600,
          }}
        >
          不是每次都要寫五大段 Prompt
        </span>
        <span aria-hidden="true" style={{ color: tokens.amber, fontSize: 'clamp(15px, 1.4vw, 25px)' }}>
          →
        </span>
        <span
          style={{
            fontSize: 'clamp(19px, 1.95vw, 34px)',
            fontWeight: 900,
            color: tokens.amber,
          }}
        >
          而是檢查自己有沒有漏掉重要資訊
        </span>
      </div>
    </SceneFrame>
  );
}
