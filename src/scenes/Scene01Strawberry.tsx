import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import strawberryImage from '../../01strawberry.png'

const LETTERS = ['s', 't', 'r', 'a', 'w', 'b', 'e', 'r', 'r', 'y']
/** Positions of the three R's inside "strawberry". */
const R_POSITIONS = [2, 7, 8]

/**
 * Which R's are glowing on each beat, by R ordinal (0 = first R).
 *
 * 2022 lights the first R, then the remaining two together — the audience
 * can plainly count three — and the model still answers "2".
 * 2026 restarts from the whole word and walks the three R's one at a time.
 */
const LIT_R_BY_BEAT: Record<number, number[]> = {
  2: [],
  3: [0],
  4: [0, 1, 2],
  5: [0, 1, 2],
  6: [],
  7: [0],
  8: [0, 1],
  9: [0, 1, 2],
  10: [0, 1, 2],
}

export const SCENE_01_BEATS = 11

function eraOf(beat: number): '2022' | '2026' | null {
  if (beat >= 6) return '2026'
  if (beat >= 2) return '2022'
  return null
}

export function Scene01Strawberry({ beat }: SceneProps) {
  const era = eraOf(beat)
  const litR = LIT_R_BY_BEAT[beat] ?? []
  const answer = beat === 5 ? '2 個' : beat >= 10 ? '3 個' : null

  return (
    <>
      <Backdrop
        src={strawberryImage}
        alt="舞台上的巨大草莓與一隻 AI 貓"
        show={beat >= 1}
        veil={beat >= 2 ? 0.78 : 0.5}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <div className="s01__opening">
          <Reveal show={beat === 0} from="scale">
            <p className="line-xl">在開始之前...</p>
          </Reveal>
          <Reveal show={beat === 1} from="scale">
            <p className="line-xl">
              你以為 AI 很<span className="hot">聰明</span>？
            </p>
          </Reveal>
        </div>

        <Reveal show={era !== null} from="down" className="s01__era">
          {era ?? '2022'}
        </Reveal>

        <div className="s01__test">
          <Reveal show={era !== null} from="up">
            <p className="line-sm">strawberry 裡面有幾個 R</p>
          </Reveal>

          <Reveal show={era !== null} from="scale" delay={120}>
            <div className="s01__word">
              {LETTERS.map((letter, index) => {
                const ordinal = R_POSITIONS.indexOf(index)
                const lit = ordinal !== -1 && litR.includes(ordinal)
                return (
                  <span
                    key={index}
                    className={`s01__letter${lit ? ' is-lit' : ''}`}
                  >
                    {letter}
                  </span>
                )
              })}
            </div>
          </Reveal>

          <Reveal show={answer !== null} from="up">
            <div className="s01__answer">
              <span className="s01__answer-tag">AI</span>
              <span className="s01__answer-text">{answer ?? ''}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
