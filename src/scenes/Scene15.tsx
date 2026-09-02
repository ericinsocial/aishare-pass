import { Fragment } from 'react'
import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene15.css'

const STEPS: Array<{ emoji: string; word: string; en: string; desc: string }> = [
  { emoji: '💡', word: '想', en: 'Intent', desc: '你要什麼？做給誰？成功長什麼樣子？這一步 AI 幫不了你。' },
  { emoji: '💬', word: '說', en: 'Prompt', desc: '把腦袋裡的東西講清楚：目標、限制、不要做的事。' },
  { emoji: '⚙️', word: '做', en: 'Generate', desc: 'AI 產出第一版。它很快，但它只是「一個版本」。' },
  { emoji: '👀', word: '看', en: 'Review', desc: '自己打開來看。不看，就等於沒有做。' },
  { emoji: '🔁', word: '改', en: 'Iterate', desc: '把差距講回去，再跑一次。好東西是改出來的。' },
]

export const SCENE_15_BEATS = 8

export function Scene15({ beat }: SceneProps) {
  const step = beat

  const shown = Math.min(Math.max(step, 0), STEPS.length)
  const loop = step >= STEPS.length + 1
  const final = step >= STEPS.length + 2

  return (
    <Deck1418Frame>
    <section className="scene s15">
      <div className="scene-kicker">Recap</div>

      <h1 className="punch" style={{ fontSize: 46, margin: '22px 0 0' }}>
        整套方法論，就這五個字
      </h1>

      <div className="s15-flow">
        {STEPS.map((s, i) => (
          <Fragment key={s.word}>
            {i > 0 && <div className={`s15-arrow${i < shown ? ' in' : ''}`}>→</div>}
            <div className={`s15-step${i < shown ? ' in' : ''}`}>
              <div className="emoji">{s.emoji}</div>
              <div className="word">{s.word}</div>
              <div className="en">{s.en}</div>
              <div className="desc">{s.desc}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={`s15-loop${loop ? ' in' : ''}`}>
        <svg width="1136" height="96" viewBox="0 0 1136 96" fill="none">
          <path
            d="M1090 0 V44 Q1090 66 1068 66 H68 Q46 66 46 44 V6"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeDasharray="7 7"
            opacity="0.75"
          />
          <path d="M46 0 L39 14 L53 14 Z" fill="var(--gold)" />
        </svg>
        <div className="label">改完再想一次</div>
      </div>

      <div className={`s15-final${final ? ' in' : ''}`}>
        <div className="l1 punch">AI 可以幫你實現想法</div>
        <div className="rule" />
        <div className="l2 punch">
          但 AI 不能替你<span className="q">「想要」</span>
        </div>
      </div>
    </section>
    </Deck1418Frame>
  )
}
