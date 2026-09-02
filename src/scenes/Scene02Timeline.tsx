import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import timelineImage from '../../02 2022-2026.png'

export const SCENE_02_BEATS = 7

interface TimelineNode {
  year: string
  /** Beat this node lights up on. */
  beat: number
  items: string[]
}

/**
 * Deliberately not a feature list. Each year describes the same thing —
 * what it takes to get something done — so the audience hears the path
 * getting shorter on your side and longer on the machine's.
 */
const NODES: TimelineNode[] = [
  { year: '2022', beat: 1, items: ['你問，它回答'] },
  { year: '2024', beat: 2, items: ['你描述，它開始幫你做'] },
  { year: '2026', beat: 3, items: ['你說出想法', '它開始幫你完成一整段工作'] },
]

/** How far the track has filled at each beat. */
const FILL_BY_BEAT = ['0%', '0%', '50%', '100%', '100%', '100%', '100%']

export function Scene02Timeline({ beat }: SceneProps) {
  // The timeline holds beats 1-3, then clears for the closing lines.
  const onTimeline = beat >= 1 && beat <= 3

  return (
    <>
      <Backdrop
        src={timelineImage}
        alt="三隻貓看著從舊電腦擴張到全息介面的舞台"
        show
        veil={beat === 0 ? 0.4 : 0.86}
      />

      <div className="s02">
        {/* 開場 */}
        <Reveal show={beat === 0} from="scale" className="s02__opening">
          <p className="eyebrow">AI 能力時間線</p>
          <p className="s02__title">2022 → 2026</p>
        </Reveal>

        {/* 時間線 */}
        <Reveal show={onTimeline} from="down" className="s02__head">
          <p className="eyebrow">2022 → 2026</p>
        </Reveal>

        <div className="s02__nodes">
          {NODES.map((node) => (
            <div key={node.year} className="s02__node">
              <Reveal show={onTimeline && beat >= node.beat} from="down">
                <p className="s02__year">{node.year}</p>
              </Reveal>
              <ul className="s02__items">
                {node.items.map((item, index) => (
                  <li key={item}>
                    <Reveal
                      show={onTimeline && beat >= node.beat}
                      from="up"
                      delay={140 + index * 120}
                    >
                      {item}
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal show={onTimeline} from="none" className="s02__track">
          <div
            className="s02__track-fill"
            style={{ width: FILL_BY_BEAT[beat] ?? '0%' }}
          />
        </Reveal>

        {/* 收束：先講邊界擴張，再把重點推到「路徑」上 */}
        <div className="s02__closing">
          <Reveal show={beat === 4} from="up" className="s02__conclusion">
            <p className="line-lg">AI 能做的事情</p>
            <p className="line-lg">
              正在<span className="hot-warm">快速擴張</span>
            </p>
          </Reveal>

          <Reveal show={beat >= 5} from="up" className="s02__conclusion">
            <div className={`s02__setup${beat >= 6 ? ' is-quiet' : ''}`}>
              <p className="line-md">真正改變的</p>
              <p className="line-lg">不只是 AI 會做更多事情</p>
            </div>
            <Reveal show={beat >= 6} from="up" delay={140} className="s02__punch">
              <p className="line-lg">
                而是做到一件事情的路徑，<span className="hot">變了</span>
              </p>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </>
  )
}
