import { useEffect, useRef } from 'react'
import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import { useFilmState } from '../film/FilmProvider'
import {
  selectCast,
  selectDoneShots,
  selectRuntimeLabel,
  selectStyleLabels,
} from '../film/selectors'
import { AI_PRODUCTION_CREDITS, type FilmState } from '../film/types'
import './scene18.css'

/**
 * Scene 18 — 剪輯 → READY FOR PREMIERE → 首映.
 *
 * The assembly stage is not a technical flex: it is what turns the wait into
 * part of the show. The audience should be able to see, without being told,
 * that the story is done, the shot plan is done, the shooting is done, and
 * the only thing left is the cut.
 *
 * The scene reads `phase` for the assembly stage and beats for the premiere,
 * so the deck stays walkable even when no live session has been run.
 */
export const SCENE_18_BEATS = 9

/** The four things that did not exist before today, one press each. */
const ABSENT = ['故事不存在', '角色不存在', '劇本不存在', '影片不存在']

/** What the audience should be able to read off the wall while it renders. */
function AssemblyStage({ state }: { state: FilmState }) {
  const total = state.shots.length
  const done = selectDoneShots(state)
  const pct = Math.round((state.assembly?.progress ?? 0) * 100)

  const checklist: Array<[string, string, boolean]> = [
    ['故事', state.story ? '好了' : '尚未開始', Boolean(state.story)],
    ['分鏡', total ? `${total} 顆，好了` : '尚未開始', total > 0],
    ['拍攝', total ? `${done} / ${total} 完成` : '尚未開始', total > 0 && done === total],
    ['剪輯', state.assembly ? `進行中 ${pct}%` : '等待中', false],
  ]

  return (
    <div className="s18-assembly">
      <div className="s18-assembly__head">
        <div className="kicker">ASSEMBLING</div>
        <h2>剪輯中</h2>
        <p>
          所有鏡頭都拍完了，現在把這些片段接成<b>一支完整的影片</b>。
        </p>
      </div>

      <div className="s18-check">
        {checklist.map(([k, v, ok]) => (
          <div className={`s18-check__row${ok ? ' ok' : ''}`} key={k}>
            <span className="mark">{ok ? '✓' : '…'}</span>
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </div>
        ))}
      </div>

      {/* The cut, as a timeline: every finished shot is a block going in. */}
      <div className="s18-timeline">
        <div className="s18-timeline__head">
          <span>timeline</span>
          <span>
            {done} / {total || '—'} shots · {selectRuntimeLabel(state)}
          </span>
        </div>
        <div className="s18-timeline__track">
          {state.shots.map((s) => (
            <span className={`blk ${s.status}`} key={s.id} title={s.slug}>
              <i>{String(s.index).padStart(2, '0')}</i>
            </span>
          ))}
          {total === 0 && <span className="blk empty" />}
        </div>
      </div>

      <div className="s18-progress">
        <div className="bar">
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="row">
          <span className="step">{state.assembly?.step ?? '等待拍攝完成'}</span>
          <span className="pct">{pct}%</span>
        </div>
      </div>

      <p className="s18-wait">等它接完的這幾分鐘，也是這支片的一部分。</p>
    </div>
  )
}

export function Scene18({ beat }: SceneProps) {
  const state = useFilmState()
  const ready = state.phase === 'ready'
  const cast = selectCast(state)
  const styles = selectStyleLabels(state)
  const videoRef = useRef<HTMLVideoElement>(null)

  // beat 0 belongs to the cut until the session says it is done; from beat 1
  // the premiere narration runs regardless, so the deck can be rehearsed dry.
  const showAssembly = beat === 0 && !ready
  const showReady = beat === 0 && ready
  const showLadder = beat >= 1 && beat <= 6
  const showTitle = beat === 7
  const showPlayer = beat >= 8

  // The beat that reveals the player is itself a key press, so this play()
  // still counts as a user gesture and is allowed to carry sound.
  useEffect(() => {
    if (!showPlayer) return
    videoRef.current?.play().catch(() => {
      /* browser declined — the presenter hits play on the controls */
    })
  }, [showPlayer])

  return (
    <Deck1418Frame>
      <section className="scene s18">
        <div className="s18-head">
          <h2>{showAssembly ? 'ASSEMBLY' : showReady ? 'READY' : 'PREMIERE'}</h2>
          {showAssembly ? (
            <span className="chip live">
              <span className="pulse" />
              cutting
            </span>
          ) : (
            <span className="chip">首映 · world premiere</span>
          )}
          {state.mock && <span className="chip mock">mock state</span>}
        </div>

        <div className="s18-body">
          {/* 剪輯中 */}
          <div className={`s18-view${showAssembly ? ' in' : ''}`}>
            <AssemblyStage state={state} />
          </div>

          {/* READY FOR PREMIERE */}
          <div className={`s18-view center${showReady ? ' in' : ''}`}>
            <div className="s18-ready">
              <div className="word">READY FOR PREMIERE</div>
              <div className="say">影片完成</div>
              <div className="meta">
                {state.shots.length} 顆鏡頭 · {selectRuntimeLabel(state)} ·{' '}
                {cast.length} 個元素全部用上
              </div>
            </div>
          </div>

          {/* 這支影片在今天分享開始之前，不存在 */}
          <div className={`s18-view${showLadder ? ' in' : ''}`}>
            <div className="s18-ladder">
              <p className={`lead${beat >= 1 ? ' on' : ''}`}>
                這支影片在今天分享開始之前，<span className="no">不存在</span>
              </p>
              <div className="rungs">
                {ABSENT.map((line, i) => (
                  <p className={`rung${beat >= i + 2 ? ' on' : ''}`} key={line}>
                    {line}
                  </p>
                ))}
              </div>
              <p className={`because${beat >= 6 ? ' on' : ''}`}>
                因為它的材料，就是剛才<span className="you">你們丟進來的東西</span>
              </p>
            </div>
          </div>

          {/* 首映 */}
          <div className={`s18-view center${showTitle ? ' in' : ''}`}>
            <div className="s18-title-card">
              <div className="cn">首映</div>
              <div className="en">world premiere</div>
            </div>
          </div>

          {/* 播放成片 */}
          <div className={`s18-view${showPlayer ? ' in' : ''}`}>
            <div className="s18-premiere">
              <div>
                <div className="player">
                  <div className="grid-lines" />
                  {state.film?.videoUrl ? (
                    <video
                      ref={videoRef}
                      src={state.film.videoUrl}
                      poster={state.film.posterUrl ?? undefined}
                      controls
                      playsInline
                    />
                  ) : (
                    <div className="slot">
                      <div className="play">▶</div>
                      <div className="slot-label">final video · 16 : 9</div>
                      <div className="slot-note">
                        {ready
                          ? '版位已保留：Live Session 完成後，成片會直接播在這裡'
                          : '尚未產生 — 這一輪是 mock，先把版位留好'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="player-bar">
                  <span>{ready ? 'premiere' : 'standby'}</span>
                  <span className="track" />
                  <span>{selectRuntimeLabel(state)}</span>
                </div>

                <div className="film-title">{state.story?.title ?? '《尚未命名》'}</div>
                <div className="film-log">
                  {state.story?.logline ??
                    '回到 AI Production Room 跑一次 Live Session，這裡就會長出故事。'}
                </div>
              </div>

              <div className="credits">
                <div className="credit-block">
                  <div className="credit-role">Directed by</div>
                  <div className="credit-name">Eric</div>
                </div>

                <div className="credit-block">
                  <div className="credit-role">Cast</div>
                  {cast.length === 0 && <div className="cast-line">—</div>}
                  <div className={`cast-list${cast.length > 6 ? ' dense' : ''}`}>
                    {cast.map((c) => (
                      <div className="cast-line" key={`${c.author}-${c.element}`}>
                        <span className="who">{c.author}</span>
                        <span className="as">飾演</span>
                        <span className="role">「{c.element}」</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="credit-block">
                  <div className="credit-role">Style</div>
                  {styles.length ? (
                    styles.map((s) => (
                      <div className="cast-line" key={s}>
                        {s}
                      </div>
                    ))
                  ) : (
                    <div className="cast-line">（Host 尚未選擇）</div>
                  )}
                </div>

                <div className="credit-block">
                  <div className="credit-role">AI Production</div>
                  {AI_PRODUCTION_CREDITS.map((c) => (
                    <div className="prod-line" key={c.role}>
                      <span className="k">{c.role}</span>
                      <span>{c.value}</span>
                    </div>
                  ))}
                  <div className="prod-note">
                    以上為未來正式 runtime production credits。本輪為 mock，沒有呼叫任何 API。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Deck1418Frame>
  )
}
