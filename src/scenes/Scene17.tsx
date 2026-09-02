import { useEffect, useRef, useState } from 'react'
import posterUrl from '../../DROPTHEBEE.png'
import { Deck1418Frame } from './Deck1418Frame'
import { useFilmCommand, useFilmState } from '../film/FilmProvider'
import { selectStyleLabels } from '../film/selectors'
import { FILM_STYLES, PHASE_ORDER, type FilmPhase, type FilmState } from '../film/types'
import './scene17.css'

const PHASE_LABEL: Record<FilmPhase, string> = {
  collecting: 'submissions',
  locked: 'lock + style',
  directing: 'reading',
  story: 'story',
  shot_plan: 'shot plan',
  generating: 'generating',
  assembling: 'assembling',
  ready: 'ready',
}

function PhaseRail({ phase }: { phase: FilmPhase }) {
  const current = PHASE_ORDER.indexOf(phase)
  return (
    <div className="s17-rail">
      {PHASE_ORDER.map((p, i) => (
        <span key={p}>
          {i > 0 && <span className="sep">›</span>}
          <span className={`p${i === current ? ' now' : i < current ? ' done' : ''}`}>
            {PHASE_LABEL[p]}
          </span>
        </span>
      ))}
    </div>
  )
}

function SubmissionsPanel({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  const [author, setAuthor] = useState('')
  const [element, setElement] = useState('')

  const send = () => {
    if (!element.trim()) return
    run((c) => c.submitElement({ author, element }))
    setElement('')
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <span>Audience submissions</span>
        <span className="count">{state.submissions.length}</span>
      </div>
      <div className="panel-scroll">
        {state.submissions.map((s, i) => (
          <div className="sub-row" key={s.id}>
            <div className="n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="el">{s.element}</div>
              <div className="by">@{s.author}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="panel-foot">
        {state.submissionsOpen ? (
          <div className="sub-form">
            <input
              className="who"
              placeholder="你的名字"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="what"
              placeholder="丟一個元素進來…"
              value={element}
              onChange={(e) => setElement(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
            />
            <button onClick={send}>送出</button>
          </div>
        ) : (
          <div className="locked-note">
            <span>🔒</span> submissions locked · {state.submissions.length} elements
          </div>
        )}
      </div>
    </div>
  )
}

function CollectingStage({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  return (
    <div className="s17-stage-pad">
      <h3 className="stage-title">投稿中 — 大家丟元素進來</h3>
      <p className="stage-sub">
        任何東西都可以：一個角色、一個物件、一句話。等一下這些全部會被塞進同一部片裡。
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <span className="chip live">
          <span className="pulse" />
          collecting
        </span>
        <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>
          目前 {state.submissions.length} 筆，還在進來…
        </span>
      </div>
      <div className="lock-cta">
        <button className="btn lock" onClick={() => run((c) => c.lockSubmissions())}>
          🔒 LOCK
        </button>
        <span className="picker-hint">按下去就不能再投稿了，接著由 Host 決定影片風格。</span>
      </div>
    </div>
  )
}

function LockedStage({ state }: { state: FilmState }) {
  const { run, error } = useFilmCommand()
  const enough = state.styles.length > 0
  return (
    <div className="s17-stage-pad">
      <h3 className="stage-title">
        🔒 已 LOCK — Host 選影片風格<span style={{ color: 'var(--ink-faint)', fontSize: 14 }}>（可複選）</span>
      </h3>
      <p className="stage-sub">選越多種，AI Director 就得把它們全部混在同一部片裡。</p>
      <div className="style-grid">
        {FILM_STYLES.map((s) => {
          const on = state.styles.includes(s.id)
          return (
            <button
              key={s.id}
              className={`style-btn${on ? ' on' : ''}`}
              aria-pressed={on}
              onClick={() => run((c) => c.toggleStyle(s.id))}
            >
              <div className="e">{s.emoji}</div>
              <div className="l">{s.label}</div>
              <div className="h">{s.hint}</div>
            </button>
          )
        })}
      </div>
      <div className="picker-foot">
        <button
          className="btn go"
          disabled={!enough}
          onClick={() => run((c) => c.startScripting())}
        >
          🎬 開始寫腳本
        </button>
        <span className="picker-hint">
          {enough ? (
            <>
              已選 <b>{state.styles.length}</b> 種：{selectStyleLabels(state).join('　')}
            </>
          ) : (
            '至少選一個風格才能開始'
          )}
        </span>
        {error && <span className="cmd-error">{error}</span>}
        <button
          className="btn ghost"
          style={{ marginLeft: 'auto' }}
          onClick={() => run((c) => c.unlockSubmissions())}
        >
          ← 解除 LOCK
        </button>
      </div>
    </div>
  )
}

function statusLine(state: FilmState): { big: string; small: string; pct: number } {
  const { phase, director, shots, currentShot, assembly } = state
  switch (phase) {
    case 'directing':
      return {
        big: `reading ${director.elementsRead}/${director.totalElements} elements`,
        small: 'AI Director 正在讀所有投稿元素',
        pct: director.totalElements ? director.elementsRead / director.totalElements : 0,
      }
    case 'story':
      return { big: 'story ✓', small: '故事線完成，準備拆鏡', pct: 1 }
    case 'shot_plan':
      return { big: `shot plan · ${shots.length} shots`, small: '分鏡完成，準備生成', pct: 1 }
    case 'generating':
      return {
        big: `generating shot ${currentShot}/${shots.length}…`,
        small: '每一顆鏡頭分開生成',
        pct: shots.length ? (currentShot - 1) / shots.length : 0,
      }
    case 'assembling':
      return {
        big: `assembling ${Math.round((assembly?.progress ?? 0) * 100)}%`,
        small: assembly?.step ?? '',
        pct: assembly?.progress ?? 0,
      }
    default:
      return { big: 'ready', small: '成片完成', pct: 1 }
  }
}

function ProductionStage({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  const { director, story, shots, phase } = state
  const logRef = useRef<HTMLDivElement>(null)
  const status = statusLine(state)

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [director.log.length])

  return (
    <div className="s17-stage-pad prod">
      <div className={`prod-status${phase === 'ready' ? ' ready' : ''}`}>
        <div className="row">
          <span className="big">{status.big}</span>
          <span className="small">{status.small}</span>
          {phase === 'ready' && (
            <button className="btn ghost" onClick={() => run((c) => c.resetSession())}>
              重跑一次
            </button>
          )}
        </div>
        <div className="bar">
          <i style={{ width: `${Math.round(status.pct * 100)}%` }} />
        </div>
      </div>

      <div className="prod-grid">
        <div className="prod-col">
          <div className="card">
            <h4>AI Director</h4>
            <div className="log" ref={logRef}>
              {director.log.join('\n')}
              {phase === 'directing' && <span className="cursor"> ▍</span>}
            </div>
          </div>

          {story && (
            <div className="card">
              <h4>Story</h4>
              <div className="story-title">{story.title}</div>
              <div className="story-log">{story.logline}</div>
              <div className="beats">
                {story.beats.map((b) => (
                  <div className="beat" key={b.id}>
                    <span className="act">{b.act}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="prod-col">
          <div className="card fill">
            <h4>
              Shot plan{shots.length > 0 && ` · ${shots.length} shots`}
            </h4>
            {shots.length === 0 ? (
              <div className="waiting">等待分鏡…</div>
            ) : (
              <div className="shots">
                {shots.map((s) => (
                  <div className={`shot ${s.status}`} key={s.id}>
                    <div className="top">
                      <span>
                        {String(s.index).padStart(2, '0')} {s.slug}
                      </span>
                      <span>
                        {s.status === 'done' ? '✓' : s.status === 'generating' ? '●' : '·'}
                      </span>
                    </div>
                    <div className="p">{s.prompt}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {phase === 'ready' && (
            <div className="ready-box">
              <span className="k">READY</span>
              <span className="v">
                按 <b style={{ color: 'var(--ink)' }}>→</b> 進 Scene 18 首映
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const SCENE_17_BEATS = 1

/** Interaction-driven: LOCK, style picking and start are clicks, not beats. */
export function Scene17() {
  const state = useFilmState()

  return (
    <Deck1418Frame>
    <section className="scene s17">
      <div className="s17-bg" style={{ backgroundImage: `url(${posterUrl})` }} />

      <div className="s17-head">
        <img className="s17-poster" src={posterUrl} alt="DROP THE BEE" />
        <div className="s17-title">
          <h2>AI Production Room</h2>
          <div className="meta">session {state.sessionCode} · rev {state.revision}</div>
        </div>
        <div className="spacer" />
        {state.mock && <span className="chip mock">mock state</span>}
        <PhaseRail phase={state.phase} />
      </div>

      <div className="s17-body">
        <SubmissionsPanel state={state} />
        <div className="panel">
          <div className="panel-head">
            <span>Host control</span>
            {state.styles.length > 0 && (
              <span className="count">{state.styles.length} styles</span>
            )}
          </div>
          {state.phase === 'collecting' && <CollectingStage state={state} />}
          {state.phase === 'locked' && <LockedStage state={state} />}
          {state.phase !== 'collecting' && state.phase !== 'locked' && (
            <ProductionStage state={state} />
          )}
          {state.styles.length > 0 && state.phase !== 'locked' && (
            <div className="panel-foot">
              <div className="style-tags">
                {selectStyleLabels(state).map((l) => (
                  <span className="style-tag" key={l}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </Deck1418Frame>
  )
}
