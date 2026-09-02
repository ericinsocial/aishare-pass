import closingUrl from '../../09.png'
import type { SceneProps } from '../deck'
import { useFilmState } from '../film/FilmProvider'
import { selectCast, selectRuntimeLabel, selectStyleLabels } from '../film/selectors'
import { AI_PRODUCTION_CREDITS } from '../film/types'
import './scene18.css'

export default function Scene18({ step }: SceneProps) {
  const state = useFilmState()
  const cast = selectCast(state)
  const styles = selectStyleLabels(state)
  const ready = state.phase === 'ready'

  const showCast = step >= 1
  const showRest = step >= 2
  const closing = step >= 3
  const closingLine = step >= 4

  return (
    <section className="scene s18">
      <div className="s18-head">
        <h2>PREMIERE</h2>
        <span className="chip">首映 · world premiere</span>
        {state.mock && <span className="chip mock">mock state</span>}
        <span style={{ marginLeft: 'auto' }} className="scene-kicker">
          Scene 18
        </span>
      </div>

      <div className="s18-body">
        <div>
          <div className="player">
            <div className="grid-lines" />
            {state.film?.videoUrl ? (
              <video src={state.film.videoUrl} poster={state.film.posterUrl ?? undefined} controls />
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
            <span>{ready ? 'ready' : 'standby'}</span>
            <span className="track" />
            <span>{selectRuntimeLabel(state)}</span>
          </div>

          <div className="film-title">{state.story?.title ?? '《尚未命名》'}</div>
          <div className="film-log">
            {state.story?.logline ?? '回到 Scene 17 跑一次 Live Session，這裡就會長出故事。'}
          </div>
        </div>

        <div className="credits">
          <div className="credit-block">
            <div className="credit-role">Directed by</div>
            <div className="credit-name">Eric</div>
          </div>

          <div className={`credit-block reveal${showCast ? ' in' : ''}`}>
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

          <div className={`credit-block reveal${showRest ? ' in' : ''}`}>
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

          <div className={`credit-block reveal${showRest ? ' in' : ''}`}>
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

      <div className={`s18-close${closing ? ' in' : ''}`}>
        <img src={closingUrl} alt="會抓老鼠，就是好貓" />
        <div className={`line${closingLine ? ' in' : ''}`}>
          會抓老鼠，<span className="cat">就是好貓</span>
        </div>
      </div>
    </section>
  )
}
