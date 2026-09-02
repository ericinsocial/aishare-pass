import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import conversationImage from '../../06.png'

export const SCENE_06_BEATS = 8

/** The beat the first line of the thread lands on. */
const FIRST_TURN_BEAT = 2

interface Turn {
  from: 'me' | 'ai'
  tag?: string
  text: string
}

/**
 * A requirement being corrected and topped up in place — which is the whole
 * argument: none of these lines is a "good prompt" on its own.
 */
const THREAD: Turn[] = [
  { from: 'me', tag: '開場', text: '幫我寫一段介紹，跟同事說明我們要開始用 AI 工具。' },
  { from: 'ai', text: '（第一版：五點條列，口吻很像公告）' },
  { from: 'me', tag: '修正', text: '太像公關稿了，講白話一點。' },
  { from: 'ai', text: '（改寫成口語版本，開頭換成一個情境）' },
  { from: 'me', tag: '補充', text: '再補一件事：他們大多沒用過 AI，開頭先講他們現在最煩的那件事。' },
]

/**
 * Scene 06 — Conversation
 *
 * 不是不用 Prompt，是不需要把每句話都寫得像 Prompt。The thread grows one turn
 * per beat so the audience watches the requirement get built by talking.
 */
export function Scene06Conversation({ beat }: SceneProps) {
  const shown = Math.max(0, Math.min(THREAD.length, beat - FIRST_TURN_BEAT + 1))

  return (
    <>
      <Backdrop
        src={conversationImage}
        alt="三隻貓與一隻老鼠並排站著，背後是一圈光環"
        show
        veil={beat >= FIRST_TURN_BEAT ? 0.86 : 0.68}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat <= 1} from="down" className="eyebrow-anchor">
          <p className="eyebrow">Conversation</p>
        </Reveal>

        {/* 開場：先擋掉「那是不是就不用 Prompt 了」 */}
        <div className="s06__swap">
          <Reveal show={beat === 0} from="up">
            <p className="line-xl">
              不是<span className="s06__struck">不用</span>
              <br />
              Prompt
            </p>
          </Reveal>

          <Reveal show={beat === 1} from="up">
            <p className="line-lg">
              是不需要把<span className="hot-cool">每一句話</span>
              <br />
              都寫得像 Prompt
            </p>
          </Reveal>
        </div>

        {/* 對話逐句進場 */}
        <div className={`s06__thread-block${beat >= FIRST_TURN_BEAT && beat <= 6 ? ' is-on' : ''}`}>
          {THREAD.map((turn, i) => (
            <Reveal
              key={i}
              show={i < shown && beat <= 6}
              from="scale"
              className={`s06__turn s06__turn--${turn.from}`}
            >
              <p className={`s06__bubble s06__bubble--${turn.from}`}>
                {turn.tag && <span className="s06__tag">{turn.tag}</span>}
                {turn.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* 收斂 */}
        <div className="s06__close">
          <Reveal show={beat >= 7} from="up">
            <p className="line-lg">
              真正的 Prompt
              <br />
              可以是<span className="hot-warm">一整段 conversation</span>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
