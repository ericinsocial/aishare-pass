import type { SceneProps } from '../types/scene'
import Rise from '../components/Rise'
import './Scene12.css'

/**
 * Scene 12 — 我跟 AI 實際工作的樣子。
 *
 * The joke is the surface. The argument underneath is that none of these
 * lines is a "good prompt", and none of them was ever meant to be: they are
 * what correcting a result actually sounds like, which is why the scene has
 * to land on conversation rather than on how well Eric swears.
 */

interface LogLine {
  text: string
  /**
   * Visual weight only. The pure-question-mark lines carry the tone on their
   * own, and a couple of the others earn the red — no line is paraphrased,
   * softened or translated to make it fit the slide.
   */
  tone?: 'qm' | 'hot'
}

/** Real correction lines, in the order they were handed over. */
const LOG: LogLine[] = [
  { text: '????????????????????', tone: 'qm' },
  { text: '不是，我剛剛不是這樣說。' },
  { text: '你為什麼又自己改？' },
  { text: '我不是叫你不要思考嗎？' },
  { text: '我說做什麼就做什麼。' },
  { text: '不對阿，這樣很亂欸。' },
  { text: '你又自己加東西幹嘛？' },
  { text: '不是說不要放這個嗎？' },
  { text: '這跟我們剛才討論的不一樣。' },
  { text: '靠杯，為什麼又變回去了？', tone: 'hot' },
  { text: '你到底改了什麼？' },
  { text: '不要自己重搞。' },
  { text: '就跟你說直接把舊的搬過去就好。' },
  { text: '你畫個屁圖，我叫你寫指令。', tone: 'hot' },
  { text: '這他媽的又是哪來的？', tone: 'hot' },
  { text: '??????????', tone: 'qm' },
]

/** The beat the second half of the log lands on. */
const SECOND_HALF = 2
const HALF = LOG.length / 2

/** What every one of those lines is actually doing, in order. */
const LOOP = ['看結果', '發現不對', '直接指出問題', '要 AI 修', '再看', '再修']

export const SCENE_12_BEATS = 6

export function Scene12({ beat }: SceneProps) {
  const docked = beat >= 1
  const finale = beat >= 4

  return (
    <div className="scene deck0912 s12">
      <div className="grain" />

      <div className={`s12__body ${finale ? 'dimmed' : ''}`}>
        <header className={`s12__head ${docked ? 'is-docked' : ''}`}>
          <Rise show className="kicker">
            真實對話紀錄
          </Rise>
          <Rise show delay={120} as="h2" className="s12__h2">
            我跟 AI 工作的樣子，
            <span className="hl-amber">沒有很優雅</span>
          </Rise>
        </header>

        <div className={`s12__work ${docked ? 'is-on' : ''}`}>
          {/* --- The log itself --- */}
          <section className="s12__log">
            <Rise show={beat >= 1} className="s12__log-head">
              隨便截一段，我自己講出去的話
            </Rise>

            {/* Two real columns, not a CSS multi-column: the reveal is gated
                by count, so the split has to be by count too. Balancing on
                height would move line 8 across the moment a bubble wraps on
                a projector with a different font fallback, and it would then
                appear on the first press above lines still hidden. */}
            <div className="s12__lines">
              {[0, 1].map((col) => (
                <div className="s12__col" key={col}>
                  {LOG.slice(col * HALF, col * HALF + HALF).map((line, i) => (
                    <Rise
                      key={line.text}
                      show={beat >= (col === 0 ? 1 : SECOND_HALF)}
                      delay={i * 90}
                      variant="right"
                      className={`s12__line${line.tone ? ` is-${line.tone}` : ''}`}
                    >
                      {line.text}
                    </Rise>
                  ))}
                </div>
              ))}
            </div>

            <Rise show={beat >= SECOND_HALF} delay={820} className="s12__log-note">
              <p>這裡面沒有一句是「好的 Prompt」</p>
              <p className="turn">但每一句都在做同一件事</p>
            </Rise>
          </section>

          {/* --- What those lines actually are --- */}
          <section className={`s12__loop${beat >= 3 ? ' is-on' : ''}`}>
            <Rise show={beat >= 3} className="s12__loop-head">
              我實際的工作方式
            </Rise>
            <ol className="s12__loop-list">
              {LOOP.map((step, i) => (
                <Rise
                  key={step}
                  show={beat >= 3}
                  delay={140 + i * 130}
                  variant="left"
                  as="li"
                  className="s12__loop-step"
                >
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t">{step}</span>
                </Rise>
              ))}
            </ol>
            <Rise show={beat >= 3} delay={960} className="s12__loop-back">
              ↺ 一直修到我要的樣子出現為止
            </Rise>
          </section>
        </div>

        {/* --- The part of the shouting that actually does the work --- */}
        <Rise show={beat >= 3} delay={1120} variant="pop" className="s12__spec">
          <p className="s12__spec-a">
            可以罵，但要<span className="hl-amber">罵得有規格</span>
          </p>
          <p className="s12__spec-b">
            有用的從來不是那句髒話，是後面那句「哪裡不對、要改成什麼」
          </p>
        </Rise>
      </div>

      {/* --- Finale --- */}
      <div className={`s12__finale ${finale ? 'is-on' : ''}`}>
        <Rise show={beat >= 4} variant="pop" as="p" className="s12__finale-a">
          我沒有神 Prompt
        </Rise>
        <Rise
          show={beat >= 4}
          delay={420}
          variant="pop"
          as="p"
          className="s12__finale-b"
        >
          我只是一直把結果，
          <span className="hl-amber">修到我要的樣子</span>
        </Rise>
        <Rise show={beat >= 5} delay={180} className="s12__finale-rule" />
        <Rise
          show={beat >= 5}
          delay={320}
          variant="pop"
          as="p"
          className="s12__finale-punch"
        >
          THE PROMPT IS THE CONVERSATION
        </Rise>
      </div>
    </div>
  )
}
