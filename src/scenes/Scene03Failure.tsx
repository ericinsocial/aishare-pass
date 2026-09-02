import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import failureImage from '../../03.png'

export const SCENE_03_BEATS = 4

export function Scene03Failure({ beat }: SceneProps) {
  return (
    <>
      <Backdrop
        src={failureImage}
        alt="三隻貓在遺跡中挖掘一塊刻字的石板"
        show
        veil={beat >= 2 ? 0.84 : 0.7}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat <= 1} from="down" className="eyebrow-anchor">
          <p className="eyebrow">AI 也會翻車</p>
        </Reveal>

        {/* 翻車現場 */}
        <div className="s03__swap">
          <Reveal show={beat === 0} from="up">
            <p className="line-xl">
              它會直接<span className="hot">講錯</span>
            </p>
          </Reveal>
          <Reveal show={beat === 1} from="up">
            <p className="line-xl">
              而且錯得<span className="hot">非常有自信</span>
            </p>
          </Reveal>
        </div>

        {/* 核心 */}
        <div className="s03__block">
          <Reveal show={beat >= 2} from="up">
            <p className="line-lg">
              AI 很會產生
              <span className="s03__quote">「像答案的東西」</span>
            </p>
          </Reveal>
          <Reveal show={beat >= 3} from="left" delay={80}>
            <div className="s03__rule" />
          </Reveal>
          <Reveal show={beat >= 3} from="up" delay={160}>
            <p className="line-lg">
              你的責任是判斷
              <br />
              它<span className="hot">是不是答案</span>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
