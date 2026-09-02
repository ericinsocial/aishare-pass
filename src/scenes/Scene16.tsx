import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene16.css'

export const SCENE_16_BEATS = 4

export function Scene16({ beat }: SceneProps) {
  const step = beat

  const lights = step >= 1
  const swap = step >= 2
  const cue = step >= 3

  return (
    <Deck1418Frame>
    <section className="scene s16">
      <div className={`s16-beams${lights ? ' on' : ''}`}>
        <div className="s16-beam a">
          <i />
        </div>
        <div className="s16-beam b">
          <i />
        </div>
      </div>

      <div className={`s16-marquee${lights ? ' on' : ''}`}>
        <div className={`s16-bulbs${lights ? ' on' : ''}`} />
      </div>

      <div className="s16-content">
        <div className={`s16-pre${lights ? ' gone' : ''}`}>投影片的部分，到這裡結束。</div>

        <div className={`s16-showtime${lights ? ' in' : ''}`}>SHOWTIME</div>

        <div className={`s16-swap${swap ? ' in' : ''}`}>
          <div className="from">我做給你看</div>
          <div className="to">
            現在，換<em>我們一起做</em>
          </div>
        </div>

        <div className={`s16-cue${cue ? ' in' : ''}`}>
          <span className="chip live">
            <span className="pulse" />
            live session
          </span>
          <span className="room">AI Production Room · 準備進場</span>
        </div>
      </div>
    </section>
    </Deck1418Frame>
  )
}
