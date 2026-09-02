import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import studioImage from '../../08.png'

export const SCENE_08_BEATS = 7

/** The beat the first step of the flow lands on. */
const FIRST_STEP_BEAT = 1

interface Step {
  icon: string
  label: string
  note: string
}

const STEPS: Step[] = [
  { icon: '💡', label: '想', note: '先有想法，不用完美' },
  { icon: '💬', label: '說', note: '用自己的話講給它聽' },
  { icon: '⚙️', label: '做', note: '讓它先做出一版' },
  { icon: '👀', label: '看', note: '看跟你想的差多少' },
  { icon: '🔁', label: '改', note: '講出差在哪，再一次' },
]

/**
 * Scene 08 — IDEA → REALITY
 *
 * 想 → 說 → 做 → 看 → 改. The loop is the payload, so the flow is built one
 * step per beat and the return arrow only closes once every step is on stage.
 */
export function Scene08IdeaToReality({ beat }: SceneProps) {
  const shown = Math.max(0, Math.min(STEPS.length, beat - FIRST_STEP_BEAT + 1))
  const loopClosed = shown >= STEPS.length

  return (
    <>
      <Backdrop
        src={studioImage}
        alt="一群貓在攝影棚裡拍片，牆上霓虹燈寫著 AI STUDIO"
        show
        veil={beat >= FIRST_STEP_BEAT ? 0.86 : 0.62}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat <= 5} from="down" className="eyebrow-anchor">
          <p className="eyebrow">Idea to Reality</p>
        </Reveal>

        {/* 標題：先只有兩端，中間怎麼過去還沒說 */}
        <div className={`s08__title-block${beat >= FIRST_STEP_BEAT ? ' is-raised' : ''}`}>
          <Reveal show={beat <= 5} from="up">
            <p className="s08__title">
              IDEA <span className="s08__arrow">→</span>{' '}
              <span className="hot-warm">REALITY</span>
            </p>
          </Reveal>
        </div>

        {/* 五個步驟逐步建立 */}
        <div className={`s08__flow-block${beat >= FIRST_STEP_BEAT && beat <= 5 ? ' is-on' : ''}`}>
          <ol className="s08__flow">
            {STEPS.map((step, i) => (
              <li className="s08__slot" key={step.label}>
                {i > 0 ? (
                  <Reveal show={i < shown && beat <= 5} from="scale" className="s08__link">
                    <span aria-hidden="true">→</span>
                  </Reveal>
                ) : (
                  /* Nothing precedes the first step; a hidden twin keeps every
                     card exactly the same width. */
                  <span className="s08__link s08__link--spacer" aria-hidden="true">
                    →
                  </span>
                )}
                <Reveal
                  show={i < shown && beat <= 5}
                  from="scale"
                  className="s08__step-wrap"
                >
                  <div className={`s08__step${i === shown - 1 ? ' is-newest' : ''}`}>
                    <span className="s08__icon" aria-hidden="true">
                      {step.icon}
                    </span>
                    <span className="s08__label">{step.label}</span>
                    <span className="s08__note">{step.note}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* 回圈：走完一輪才接回「說」 */}
          <Reveal show={loopClosed && beat <= 5} from="scale" className="s08__loop-wrap">
            <div className="s08__loop" aria-hidden="true">
              <span className="s08__loop-head" />
              <span className="s08__loop-label">不滿意？回去再說一次就好</span>
            </div>
          </Reveal>
        </div>

        {/* 收斂 */}
        <div className="s08__close">
          <Reveal show={beat >= 6} from="up">
            <p className="line-xl">
              只要有想法
              <br />
              就試著把它<span className="hot-warm">實現</span>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
