import { Fragment, useEffect, useState } from 'react'
import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene19.css'

/**
 * Scene 19 — the reflection that has to sit between the premiere and the end.
 *
 * Cutting straight from the film to the closing image lands too fast: the
 * point of the live session is not the film, it is that a room full of
 * unrelated elements found a path to becoming one. So the scene opens on a
 * deliberate two-second hold — the audience is still watching the last frame —
 * and only then starts talking.
 */
export const SCENE_19_BEATS = 11

/** How long the stage stays quiet after the film before the first line. */
const HOLD_MS = 2000

/**
 * Every step between "a pile of elements" and "a film someone can follow".
 * Rendered as waypoints on one route, never as a wall of tool logos — the
 * whole point of the next line is that none of them is the destination.
 */
const PATH_STEPS = [
  'AI Director',
  '文字模型',
  '影片模型',
  '聲音',
  '剪輯',
  '程式',
  '後端',
]

export function Scene19({ beat }: SceneProps) {
  const [held, setHeld] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeld(true), HOLD_MS)
    return () => clearTimeout(timer)
  }, [])

  // Stepping back into the scene lands on a later beat — no reason to wait then.
  const opened = held || beat >= 1

  return (
    <Deck1418Frame>
      <section className="scene s19">
        <div className="s19-stack">
          {/* 神作或災難，都證明了同一件事 */}
          <div className={`s19-view${beat <= 2 ? ' in' : ''}`}>
            <div className="s19-verdicts">
              <p className={`v masterpiece${opened ? ' on' : ''}`}>
                不管剛才那支片到底是<span>神作</span>
              </p>
              <p className={`v disaster${beat >= 1 ? ' on' : ''}`}>
                還是<span>災難</span>
              </p>
            </div>
            <p className={`s19-either${beat >= 2 ? ' on' : ''}`}>
              它其實都證明了今天我要講的事情
            </p>
          </div>

          {/* 重點不是「AI 拍出了一支完美的電影」 */}
          <div className={`s19-view${beat >= 3 && beat <= 4 ? ' in' : ''}`}>
            <p className={`s19-not${beat >= 3 ? ' on' : ''}`}>重點不是</p>
            <p className={`s19-struck${beat >= 4 ? ' on' : ''}`}>
              AI 拍出了一支完美的電影
            </p>
          </div>

          {/* 幾分鐘以前，什麼都沒有 */}
          <div className={`s19-view${beat >= 5 && beat <= 7 ? ' in' : ''}`}>
            <p className={`s19-ago${beat >= 5 ? ' on' : ''}`}>幾分鐘以前</p>
            <p className={`s19-none${beat >= 6 ? ' on' : ''}`}>連故事都沒有</p>
            <p className={`s19-raw${beat >= 7 ? ' on' : ''}`}>
              我們只有一群人隨口丟出來的元素
            </p>
          </div>

          {/* 主句 */}
          <div className={`s19-view center${beat === 8 ? ' in' : ''}`}>
            <p className="s19-main">
              把所有人的東西，<br />
              變成一支<span>看得懂的影片</span>
            </p>
          </div>

          {/* 路徑 */}
          <div className={`s19-view${beat >= 9 ? ' in' : ''}`}>
            <div className="s19-route">
              <div className={`s19-route__line${beat >= 9 ? ' on' : ''}`}>
                <span className="end from">你們丟進來的元素</span>
                {PATH_STEPS.map((step, i) => (
                  <Fragment key={step}>
                    <span className="hop" aria-hidden="true">
                      →
                    </span>
                    <span className="step" style={{ transitionDelay: `${i * 90}ms` }}>
                      {step}
                    </span>
                  </Fragment>
                ))}
                <span className="hop" aria-hidden="true">
                  →
                </span>
                <span className="end to">一支看得懂的影片</span>
              </div>
              <p className={`s19-punch${beat >= 10 ? ' on' : ''}`}>
                這些全部都是<span>路徑</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Deck1418Frame>
  )
}
