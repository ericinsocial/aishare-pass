import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import promptImage from '../../04.png'

export const SCENE_04_BEATS = 4

const SPELLS = ['你是一位世界頂尖的專家', '請一步一步思考', '這件事對我非常重要']

export function Scene04PromptArchaeology({ beat }: SceneProps) {
  return (
    <>
      <Backdrop
        src={promptImage}
        alt="一隻人類貓與一隻 AI 貓隔著桌子對話"
        show
        veil={beat >= 3 ? 0.84 : 0.66}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat <= 2} from="down" className="eyebrow-anchor">
          <p className="eyebrow">Prompt Archaeology</p>
        </Reveal>

        {/* 開場 */}
        <div className="s04__block">
          <Reveal show={beat === 0} from="up">
            <p className="line-xl">
              我們挖出了一堆
              <br />
              <span className="hot-warm">古代 Prompt</span>
            </p>
          </Reveal>
        </div>

        {/* 咒語時代 */}
        <div className="s04__block">
          <Reveal show={beat >= 1 && beat <= 2} from="up">
            <p className="line-lg">
              以前我們把 Prompt 當<span className="hot-warm">咒語</span>
            </p>
          </Reveal>
          <Reveal show={beat >= 1 && beat <= 2} from="up" delay={140}>
            <div className="s04__spells">
              {SPELLS.map((spell) => (
                <span
                  key={spell}
                  className={`s04__spell${beat >= 2 ? ' is-dead' : ''}`}
                >
                  {spell}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 現在真正重要的事 */}
        <div className="s04__block">
          <Reveal show={beat >= 3} from="up">
            <p className="line-md">真正重要的其實是</p>
          </Reveal>
          <Reveal show={beat >= 3} from="up" delay={160}>
            <p className="line-xl">
              你到底有沒有
              <br />
              把需求<span className="hot">說清楚</span>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
