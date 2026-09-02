import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import { useFilmState } from '../film/FilmProvider'
import './scene16.css'

/**
 * Scene 16 — the hand-off into the live session.
 *
 * This is NOT a closing slide. Its whole job is to turn "I have been telling
 * you AI can turn an idea into a thing" into "so let's make one, right now,
 * out of whatever you throw at me". Every beat below is one line the presenter
 * says, so the punchline ("那好像有點遜") lands on its own press.
 */
export const SCENE_16_BEATS = 10

/** Beat the house lights come up on — the moment we commit to doing it live. */
const LIGHTS_BEAT = 5
const LIVE_BEAT = 9

/**
 * Stand-in for the audience QR.
 *
 * The real code is generated from the live session's join URL, which does not
 * exist in this build. Rather than fake a scannable code, this draws the QR's
 * silhouette — finder squares and a module field — so the slide is composed
 * for the real one and swapping it in is a single <img> later.
 */
function SubmitCode({ sessionCode }: { sessionCode: string }) {
  return (
    <div className="s16-qr">
      <div className="s16-qr__code" aria-hidden="true">
        <span className="f tl" />
        <span className="f tr" />
        <span className="f bl" />
        <span className="field" />
        <span className="s16-qr__mark">投稿</span>
      </div>
      <div className="s16-qr__meta">
        <div className="k">掃碼投稿</div>
        <div className="v">{sessionCode}</div>
        <div className="n">一個人丟一個元素，等一下全部都要用</div>
      </div>
    </div>
  )
}

export function Scene16({ beat }: SceneProps) {
  const state = useFilmState()

  const lights = beat >= LIGHTS_BEAT
  const live = beat >= LIVE_BEAT

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
          {/* House sign, not a section header — it lights up when we stop talking. */}
          <span className={`s16-sign${lights ? ' on' : ''}`}>SHOWTIME</span>
        </div>

        <div className="s16-content">
          {/* 「那我們現在不要講了」 */}
          <div className={`s16-stanza${beat === 0 ? ' in' : ''}`}>
            <p className="lead">那我們現在不要講了</p>
          </div>

          {/* 講了這麼久 → 而我一直在講的，是這件事 */}
          <div className={`s16-stanza${beat >= 1 && beat <= 2 ? ' in' : ''}`}>
            <p className={`small${beat >= 1 ? ' on' : ''}`}>我前面講了這麼久</p>
            <p className={`lead gold${beat >= 2 ? ' on' : ''}`}>AI 可以把想法變成東西</p>
          </div>

          {/* 笑點：只放 PowerPoint 有點遜 */}
          <div className={`s16-stanza${beat >= 3 && beat <= 4 ? ' in' : ''}`}>
            <p className={`mid${beat >= 3 ? ' on' : ''}`}>
              如果最後我只放 PowerPoint 給大家看——
            </p>
            <p className={`punchline${beat >= 4 ? ' on' : ''}`}>那好像有點遜</p>
          </div>

          {/* 不講案例，直接做 */}
          <div className={`s16-stanza${beat >= 5 && beat <= 6 ? ' in' : ''}`}>
            <p className={`small${beat >= 5 ? ' on' : ''}`}>所以接下來我不想再講案例</p>
            <p className={`huge${beat >= 6 ? ' on' : ''}`}>我們直接現場做一個</p>
          </div>

          {/* 而且內容不是我準備的 */}
          <div className={`s16-stanza${beat >= 7 && beat <= 8 ? ' in' : ''}`}>
            <p className={`mid${beat >= 7 ? ' on' : ''}`}>而且這次不是我準備好的</p>
            <p className={`lead cyan${beat >= 8 ? ' on' : ''}`}>是你們決定內容</p>
          </div>

          {/* 正式開場：LIVE SESSION + 投稿入口 */}
          <div className={`s16-stanza wide${live ? ' in' : ''}`}>
            <div className="s16-live">
              <span className="chip live">
                <span className="pulse" />
                live session
              </span>
              <div className="s16-live__word">LIVE SESSION</div>
              <div className="s16-live__sub">現在開始，內容由現場的人決定</div>
            </div>
            <SubmitCode sessionCode={state.sessionCode} />
          </div>
        </div>
      </section>
    </Deck1418Frame>
  )
}
