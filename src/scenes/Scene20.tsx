import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene20.css'

/**
 * Scene 20 — back to the palm from the top of the talk.
 *
 * The trick is not that the hand ends up face down; it is that turning the
 * wrist was never the only way to get there. That is the whole claim about
 * AI in this deck, so the scene stays on one image — palm up, palm down, two
 * routes between them — while the lines land one press at a time.
 */
export const SCENE_20_BEATS = 12

export function Scene20({ beat }: SceneProps) {
  const wrist = beat >= 1
  const doubt = beat >= 3
  const other = beat >= 4
  const showHands = beat <= 4

  return (
    <Deck1418Frame>
      <section className="scene s20">
        <div className="s20-stack">
          {/* 手掌翻轉：熟悉的路，和另外一條路 */}
          <div className={`s20-view${showHands ? ' in' : ''}`}>
            <div className="s20-lines">
              <p className="assume on">我們一開始以為</p>
              <p className={`claim${wrist ? ' on' : ''}`}>
                手掌要翻過來，就<span className={doubt ? ' struck' : ''}>一定</span>
                要轉手腕
              </p>
              <p className={`why${beat >= 2 ? ' on' : ''}`}>因為那是我們熟悉的方法</p>
              <p className={`but${doubt ? ' on' : ''}`}>但不一定</p>
              <p className={`other${other ? ' on' : ''}`}>你可以走另外一條路</p>
            </div>

            <div className="s20-flip">
              <div className="s20-hand">
                <span className="palm" aria-hidden="true">
                  ✋
                </span>
                <span className="tag">手心</span>
              </div>

              <div className="s20-routes">
                {/* Stretched to the gap between the two hands; the stroke is
                    kept uniform so the arcs read as one route each. */}
                <svg viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    className={`arc a${wrist ? ' on' : ''}${doubt ? ' faded' : ''}`}
                    vectorEffect="non-scaling-stroke"
                    d="M16 100 C 200 18, 600 18, 784 96"
                  />
                  <path
                    className={`arc b${other ? ' on' : ''}`}
                    vectorEffect="non-scaling-stroke"
                    d="M16 100 C 200 200, 600 200, 784 104"
                  />
                </svg>
                <span className={`route-label top${wrist ? ' on' : ''}${doubt ? ' faded' : ''}`}>
                  轉手腕 · 熟悉的方法
                </span>
                <span className={`route-label bottom${other ? ' on' : ''}`}>
                  另外一條路
                </span>
              </div>

              <div className="s20-hand flipped">
                <span className="palm" aria-hidden="true">
                  ✋
                </span>
                <span className="tag">手背</span>
              </div>
            </div>
          </div>

          {/* AI 的意義：不是什麼都會，是多一個選擇 */}
          <div className={`s20-view${beat >= 5 && beat <= 8 ? ' in' : ''}`}>
            <div className="s20-meaning">
              <p className={`m0${beat >= 5 ? ' on' : ''}`}>AI 對我最大的意義也是這個</p>
              <p className={`m1${beat >= 6 ? ' on' : ''}`}>它不是讓我突然什麼都會</p>
              <p className={`m2${beat >= 7 ? ' on' : ''}`}>當我碰到原本不會的事情時</p>
              <p className={`m3${beat >= 8 ? ' on' : ''}`}>多了一個選擇</p>
            </div>
          </div>

          {/* 以前 / 現在 */}
          <div className={`s20-view${beat >= 9 ? ' in' : ''}`}>
            <div className="s20-then-now">
              <div className={`col then${beat >= 9 ? ' on' : ''}`}>
                <div className="when">以前</div>
                <p className="say">我不會，所以不能做</p>
              </div>
              <div className={`col now${beat >= 10 ? ' on' : ''}`}>
                <div className="when">現在</div>
                <p className="say">我不會</p>
                <p className={`ask${beat >= 11 ? ' on' : ''}`}>但是，有沒有別條路？</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Deck1418Frame>
  )
}
