import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import elementsImage from '../../05.png'

export const SCENE_05_BEATS = 8

/** The beat the first checklist item lands on. */
const FIRST_ITEM_BEAT = 2

interface Element {
  name: string
  ask: string
}

/**
 * Written as questions on purpose. They are not five sections to fill in —
 * they are five things to check you did not leave out.
 */
const ELEMENTS: Element[] = [
  { name: '角色', ask: '我有沒有說，要它站在什麼角度回答？' },
  { name: '任務', ask: '我有沒有說清楚，到底要它做出什麼？' },
  { name: '脈絡', ask: '我有沒有給背景？它憑什麼知道我的狀況？' },
  { name: '限制', ask: '我有沒有講「不要什麼」？長度、語氣、禁區？' },
  { name: '格式', ask: '我要什麼形狀？表格、條列，還是一段話？' },
]

/**
 * Scene 05 — Prompt 五大元素
 *
 * The slide argues against reading these as a formula. They arrive one per
 * beat as self-checks, the moment of use is named up front (AI 回得不好的時候),
 * and the scene closes by crossing out the belief Scene 04 set up —
 * 「Prompt 越完整，AI 越厲害」 — in favour of 「不需要一次寫完」.
 */
export function Scene05PromptElements({ beat }: SceneProps) {
  const checked = Math.max(0, Math.min(ELEMENTS.length, beat - FIRST_ITEM_BEAT + 1))

  return (
    <>
      <Backdrop
        src={elementsImage}
        alt="三隻貓站在斷崖前，看著一道由光構成的橋通往遠方城市"
        show
        veil={beat >= FIRST_ITEM_BEAT ? 0.84 : 0.66}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat <= 1} from="down" className="eyebrow-anchor">
          <p className="eyebrow">Prompt 五大元素</p>
        </Reveal>

        {/* 開場：先把「公式」這個誤解劃掉 */}
        <div className="s05__swap">
          <Reveal show={beat === 0} from="up">
            <p className="line-xl">
              五大元素
              <br />
              <span className="s05__struck">不是 Prompt 公式</span>
            </p>
          </Reveal>

          <Reveal show={beat === 1} from="up">
            {/* A checklist with no stated moment of use reads as a form to
                fill in before sending. Naming the moment is what makes it
                a diagnostic instead. */}
            <div className="s05__when">
              <p className="line-md">AI 回得不好的時候</p>
              <p className="line-lg">
                我回頭看這張
                <br />
                <span className="hot-cool">「我是不是漏講什麼？」</span>
                <br />
                的 Checklist
              </p>
            </div>
          </Reveal>
        </div>

        {/* 五大元素逐項進場 */}
        <div className={`s05__list-block${beat >= FIRST_ITEM_BEAT && beat <= 6 ? ' is-on' : ''}`}>
          <Reveal show={beat >= FIRST_ITEM_BEAT && beat <= 6} from="scale">
            <p className="s05__list-head">
              我是不是漏講什麼？
              <span className="s05__count">
                {checked} / {ELEMENTS.length}
              </span>
            </p>
          </Reveal>

          <ul className="s05__list">
            {ELEMENTS.map((element, i) => (
              <Reveal
                key={element.name}
                show={i < checked && beat <= 6}
                from="scale"
                className="s05__row-wrap"
              >
                <li className={`s05__row${i === checked - 1 ? ' is-newest' : ''}`}>
                  <span className="s05__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span className="s05__name">{element.name}</span>
                  <span className="s05__ask">{element.ask}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* 收斂 */}
        <div className="s05__close">
          <Reveal show={beat >= 7} from="up">
            <p className="line-md s05__struck-line">
              以前我以為，Prompt 寫得越完整，AI 就越厲害
            </p>
          </Reveal>
          <Reveal show={beat >= 7} from="up" delay={180}>
            <p className="line-lg">
              現在我知道
              <br />
              Prompt <span className="hot">不需要一次寫完</span>
            </p>
          </Reveal>
          <Reveal show={beat >= 7} from="up" delay={360}>
            <p className="line-sm">
              它回得不對的時候，我才回頭檢查自己有沒有漏掉重要資訊
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
