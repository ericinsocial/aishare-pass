import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import timelineImage from '../../02 2022-2026.png'

export const SCENE_02_BEATS = 5

interface TimelineNode {
  year: string
  /** Beat this node lights up on. */
  beat: number
  items: string[]
}

const NODES: TimelineNode[] = [
  { year: '2022', beat: 1, items: ['生成一段文字'] },
  { year: '2024', beat: 2, items: ['寫程式', '讀圖片', '生成圖片'] },
  { year: '2026', beat: 3, items: ['看影片', '操作工具', '跑完一整段流程'] },
]

/** How far the track has filled at each beat. */
const FILL_BY_BEAT = ['0%', '0%', '50%', '100%', '100%']

export function Scene02Timeline({ beat }: SceneProps) {
  // The timeline holds beats 1-3, then clears for the closing line.
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

        {/* 結論 */}
        <Reveal show={beat >= 4} from="up" className="s02__conclusion">
          <p className="line-lg">
            不是突然出現一個<span className="hot-warm">新工具</span>
          </p>
          <p className="line-lg">
            而是 AI 能做的事情<span className="hot-warm">快速擴張</span>
          </p>
        </Reveal>
      </div>
    </>
  )
}
