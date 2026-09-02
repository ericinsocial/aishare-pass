import type { CSSProperties } from 'react';
import { SceneFrame } from './SceneFrame';
import type { SceneProps } from './types';
import { clampBeat, eyebrow, reveal, tokens } from './sceneStyles';

/**
 * Scene 06 — Conversation
 *
 * The correction this slide makes: 不是不用 Prompt，是不需要把每句話都寫得像
 * Prompt。The thread grows one turn at a time so the audience watches the
 * requirement get corrected and topped up in place — which is the real point:
 * 真正的 Prompt 可以是一整段 conversation。
 *
 * Beats
 *  0            標題 +「不是不用 Prompt」
 *  1            「是不需要把每句話都寫得像 Prompt」
 *  2 – 6        對話逐句進場（開場 → 回覆 → 修正 → 回覆 → 補充）
 *  7            收斂：整段對話本身就是 Prompt
 */
export const beats = 8;

const FIRST_TURN_BEAT = 2;

interface Turn {
  from: 'me' | 'ai';
  tag?: string;
  text: string;
}

const THREAD: Turn[] = [
  {
    from: 'me',
    tag: '開場',
    text: '幫我寫一段介紹，跟同事說明我們要開始用 AI 工具。',
  },
  {
    from: 'ai',
    text: '（產出第一版：五點條列、口吻很像公告）',
  },
  {
    from: 'me',
    tag: '修正',
    text: '太像公關稿了，講白話一點，像在茶水間聊天那樣。',
  },
  {
    from: 'ai',
    text: '（改寫成口語版本，開頭換成一個情境）',
  },
  {
    from: 'me',
    tag: '補充',
    text: '再補一件事：他們大多沒用過 AI，開頭先講他們現在最煩的那件事。',
  },
];

function TurnBubble({ turn, visible }: { turn: Turn; visible: boolean }): JSX.Element {
  const mine = turn.from === 'me';

  const row: CSSProperties = {
    ...reveal(visible, { y: 18, x: mine ? 28 : -28 }),
    display: 'flex',
    justifyContent: mine ? 'flex-end' : 'flex-start',
    gap: 'clamp(8px, 0.9vw, 14px)',
    alignItems: 'flex-end',
  };

  const bubble: CSSProperties = {
    maxWidth: '78%',
    padding: 'clamp(10px, 1.1vw, 20px) clamp(14px, 1.4vw, 24px)',
    borderRadius: mine ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
    background: mine ? 'rgba(111, 227, 255, 0.14)' : tokens.panel,
    border: `1px solid ${mine ? 'rgba(111, 227, 255, 0.42)' : tokens.panelEdge}`,
    fontSize: 'clamp(14px, 1.3vw, 23px)',
    lineHeight: 1.5,
    color: mine ? tokens.ink : tokens.inkMuted,
    fontWeight: mine ? 600 : 400,
    fontStyle: mine ? 'normal' : 'italic',
  };

  const avatar: CSSProperties = {
    flex: '0 0 auto',
    width: 'clamp(24px, 2.2vw, 38px)',
    height: 'clamp(24px, 2.2vw, 38px)',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'clamp(10px, 0.9vw, 15px)',
    fontWeight: 900,
    letterSpacing: '0.02em',
    background: mine ? 'rgba(111, 227, 255, 0.2)' : 'rgba(255, 181, 71, 0.16)',
    border: `1px solid ${mine ? tokens.cyan : tokens.amber}`,
    color: mine ? tokens.cyan : tokens.amber,
  };

  return (
    <div style={row}>
      {!mine && (
        <span style={avatar} aria-hidden="true">
          AI
        </span>
      )}
      <div style={bubble}>
        {turn.tag && (
          <span
            style={{
              display: 'inline-block',
              marginRight: 10,
              padding: '2px 9px',
              borderRadius: 999,
              background: tokens.amber,
              color: tokens.bg,
              fontSize: 'clamp(10px, 0.82vw, 14px)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              verticalAlign: 'middle',
              fontStyle: 'normal',
            }}
          >
            {turn.tag}
          </span>
        )}
        {turn.text}
      </div>
      {mine && (
        <span style={avatar} aria-hidden="true">
          你
        </span>
      )}
    </div>
  );
}

export default function Scene06({ beat, imageSrc = '/06.png' }: SceneProps): JSX.Element {
  const b = clampBeat(beat, beats);
  const shownTurns = Math.max(0, Math.min(THREAD.length, b - FIRST_TURN_BEAT + 1));
  const closing = b >= 7;

  const columns: CSSProperties = {
    display: 'flex',
    gap: 'clamp(24px, 3.2vw, 56px)',
    flex: 1,
    minHeight: 0,
  };

  const left: CSSProperties = {
    flex: '0 0 36%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(12px, 1.4vw, 22px)',
  };

  const thread: CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(8px, 0.9vw, 15px)',
    padding: 'clamp(12px, 1.4vw, 26px)',
    borderRadius: 18,
    background: 'rgba(4, 8, 16, 0.5)',
    border: `1px solid ${tokens.panelEdge}`,
  };

  return (
    <SceneFrame imageSrc={imageSrc} imagePosition="center 30%" dim={0.8} accent={tokens.amber}>
      <div style={{ marginBottom: 'clamp(14px, 1.8vw, 30px)' }}>
        <span style={eyebrow}>Conversation</span>
      </div>

      <div style={columns}>
        <div style={left}>
          <p
            style={{
              ...reveal(b >= 0, { y: 18 }),
              margin: 0,
              fontSize: 'clamp(26px, 3.1vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.22,
            }}
          >
            不是
            <span
              style={{
                color: 'rgba(242, 246, 255, 0.5)',
                textDecorationLine: 'line-through',
                textDecorationColor: tokens.amber,
                textDecorationThickness: '4px',
              }}
            >
              不用
            </span>
            <br />
            Prompt
          </p>

          <p
            style={{
              ...reveal(b >= 1, { y: 16 }),
              margin: 0,
              fontSize: 'clamp(16px, 1.6vw, 28px)',
              lineHeight: 1.5,
              fontWeight: 600,
              color: tokens.ink,
            }}
          >
            是不需要把
            <span style={{ color: tokens.cyan }}>每一句話</span>
            <br />
            都寫得像 Prompt
          </p>

          <p
            style={{
              ...reveal(b >= FIRST_TURN_BEAT, { y: 14, delayMs: 80 }),
              margin: 0,
              fontSize: 'clamp(12px, 1.05vw, 18px)',
              lineHeight: 1.6,
              color: tokens.inkFaint,
            }}
          >
            你可以邊講邊修：講一句、看一版、
            <br />
            改一句、再補一句。
          </p>
        </div>

        <div style={{ ...thread, ...reveal(b >= FIRST_TURN_BEAT, { y: 14, x: 18 }) }}>
          {THREAD.map((turn, i) => (
            <TurnBubble key={i} turn={turn} visible={i < shownTurns} />
          ))}
        </div>
      </div>

      <div
        style={{
          ...reveal(closing, { y: 18 }),
          marginTop: 'clamp(14px, 1.8vw, 28px)',
          paddingTop: 'clamp(12px, 1.5vw, 24px)',
          borderTop: `1px solid ${tokens.panelEdge}`,
          display: 'flex',
          alignItems: 'baseline',
          gap: 'clamp(10px, 1.1vw, 20px)',
          flexWrap: 'wrap',
        }}
      >
        <span aria-hidden="true" style={{ color: tokens.amber, fontSize: 'clamp(16px, 1.5vw, 27px)' }}>
          ↳
        </span>
        <span style={{ fontSize: 'clamp(19px, 1.95vw, 34px)', fontWeight: 900, color: tokens.amber }}>
          真正的 Prompt，可以是一整段 conversation
        </span>
      </div>
    </SceneFrame>
  );
}
