import { useEffect, useRef, useState } from 'react'
import posterUrl from '../../DROPTHEBEE.png'
import { Deck1418Frame } from './Deck1418Frame'
import { useFilmCommand, useFilmState } from '../film/FilmProvider'
import { selectDoneShots, selectStyleLabels } from '../film/selectors'
import {
  FILM_STYLES,
  PHASE_ORDER,
  type FilmPhase,
  type FilmState,
  type Shot,
} from '../film/types'
import './scene17.css'

/**
 * Scene 17 — the live session itself.
 *
 * The room walks the run-of-show in the script: 投稿 → LOCK → 選風格 →
 * AI Director → 故事 → 分鏡 → 拍攝. None of that is a beat: every step is a
 * phase of the existing FilmState, so what is on screen is always what the
 * session actually is, not what the presenter last pressed.
 */
export const SCENE_17_BEATS = 1

const PHASE_LABEL: Record<FilmPhase, string> = {
  collecting: '投稿',
  locked: 'lock + 風格',
  directing: 'ai director',
  story: '故事',
  shot_plan: '分鏡',
  generating: '拍攝',
  assembling: '剪輯',
  ready: '完成',
}

/**
 * Examples of what to throw in, said out loud on stage. Deliberately rendered
 * as loose examples rather than a five-field form — the point is that anything
 * counts, not that submissions come in five flavours.
 */
const ELEMENT_EXAMPLES = ['一個人', '一隻動物', '一個地方', '一個物件', '一件事情']

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

/** The wall. It only ever grows, and the count is the promise. */
function SubmissionsPanel({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  const [author, setAuthor] = useState('')
  const [element, setElement] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // New elements land at the bottom, so follow them down.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [state.submissions.length])

  const send = () => {
    if (!element.trim()) return
    run((c) => c.submitElement({ author, element }))
    setElement('')
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <span>Submission wall</span>
        <span className="count">{state.submissions.length}</span>
      </div>
      <div className="panel-scroll" ref={scrollRef}>
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
            <span>🔒</span> 元素已固定 · {state.submissions.length} 個
          </div>
        )}
      </div>
    </div>
  )
}

/** 投稿 — and the promise that every single one of them gets used. */
function CollectingStage({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  return (
    <div className="s17-stage-pad">
      <h3 className="stage-title">大家每個人丟一個元素進來</h3>
      <div className="s17-examples">
        {ELEMENT_EXAMPLES.map((e) => (
          <span className="ex" key={e}>
            {e}
          </span>
        ))}
        <span className="ex-note">…都可以，這只是我現在隨口舉的例子</span>
      </div>

      <div className="s17-manifesto">
        <p className="m1">這些東西不是我準備的</p>
        <p className="m2">全部都要用</p>
        <p className="m3">不是 AI 自己挑幾個最好用的</p>
        <p className="m4">你敢投稿，它就要想辦法把你塞進故事</p>
      </div>

      <div className="lock-cta">
        <span className="chip live">
          <span className="pulse" />
          投稿中 · {state.submissions.length}
        </span>
        <button className="btn lock" onClick={() => run((c) => c.lockSubmissions())}>
          🔒 LOCK
        </button>
        <span className="picker-hint">按下去元素就固定了，接著選影片風格。</span>
      </div>
    </div>
  )
}

/** LOCK — elements frozen, then the ten styles. Multi-select on purpose. */
function LockedStage({ state }: { state: FilmState }) {
  const { run, error } = useFilmCommand()
  const enough = state.styles.length > 0
  return (
    <div className="s17-stage-pad">
      <div className="s17-locked-line">
        <span className="seal">🔒 LOCK</span>
        <div>
          <div className="big">從這一刻開始，元素固定</div>
          <div className="small">
            {state.submissions.length} 個元素，一個都不會被丟掉
          </div>
        </div>
      </div>

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
            '至少選一個風格才能開始（可複選）'
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

/** One shot, opened up: a shot is a spec, not a one-line wish. */
function ShotCard({ shot, expanded }: { shot: Shot; expanded: boolean }) {
  const d = shot.details
  const rows: Array<[string, string]> = d
    ? [
        ['誰', d.who],
        ['做什麼', d.action],
        ['場景', d.setting],
        ['承接上一鏡', d.continuity],
        ['攝影機', d.camera],
        ['台詞／旁白', d.line],
        ['環境聲音', d.sound],
      ]
    : []

  return (
    <div className={`shot ${shot.status}${expanded ? ' open' : ''}`}>
      <div className="top">
        <span>
          {String(shot.index).padStart(2, '0')} {shot.slug}
        </span>
        <span className="tail">
          <span className="dur">{shot.durationSec}s</span>
          {shot.status === 'done' ? '✓' : shot.status === 'generating' ? '●' : '·'}
        </span>
      </div>
      <div className="p">{shot.prompt}</div>
      {rows.length > 0 && (
        <dl className="shot-details">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

/** 4/5 — AI Director reading every locked element, out loud. */
function DirectingStage({ state }: { state: FilmState }) {
  const { director } = state
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [director.log.length])

  return (
    <div className="s17-director">
      <div className="s17-director__head">
        <div className="who">AI DIRECTOR</div>
        <h3>正在理解全場所有元素</h3>
        <p className="claim">一個都不能漏</p>
      </div>

      <div className="s17-counter">
        <span className="now">{director.elementsRead}</span>
        <span className="of">/ {director.totalElements}</span>
        <span className="unit">個元素</span>
      </div>

      <div className="bar">
        <i
          style={{
            width: `${
              director.totalElements
                ? Math.round((director.elementsRead / director.totalElements) * 100)
                : 0
            }%`,
          }}
        />
      </div>

      <div className="card">
        <h4>reading</h4>
        <div className="log" ref={logRef}>
          {director.log.join('\n')}
          <span className="cursor"> ▍</span>
        </div>
      </div>
    </div>
  )
}

/** 6 — the story, big enough to read off the wall. */
function StoryStage({ state }: { state: FilmState }) {
  const { story } = state
  if (!story) return <div className="waiting">等待故事…</div>
  return (
    <div className="s17-story">
      <div className="s17-story__kicker">STORY</div>
      <h3 className="s17-story__title">{story.title}</h3>
      <p className="s17-story__log">{story.logline}</p>
      <div className="beats">
        {story.beats.map((b) => (
          <div className="beat" key={b.id}>
            <span className="act">{b.act}</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>
      {/* Says what just happened without covering the thing that happened. */}
      <div className="s17-aside">
        我們沒有給劇本，只給元素 —— <b>我們給的是效果，AI 找的是路徑</b>
      </div>
    </div>
  )
}

/** 7 — the shot plan, one card per shot, details and all. */
function ShotPlanStage({ state }: { state: FilmState }) {
  return (
    <div className="s17-shots">
      <div className="s17-shots__head">
        <div>
          <div className="kicker">SHOT PLAN</div>
          <h3>{state.shots.length} 顆鏡頭 · 每顆 10 秒</h3>
        </div>
        <p className="note">
          每一顆都寫清楚誰、做什麼、在哪、怎麼接上一鏡、鏡頭怎麼走、講什麼、聽得到什麼
        </p>
      </div>
      <div className="shots plan">
        {state.shots.map((s) => (
          <ShotCard key={s.id} shot={s} expanded />
        ))}
      </div>
    </div>
  )
}

/** 8 — generating, one shot at a time, with the count the audience wants. */
function GeneratingStage({ state }: { state: FilmState }) {
  const total = state.shots.length
  const current = state.shots.find((s) => s.status === 'generating') ?? null
  const done = selectDoneShots(state)

  return (
    <div className="s17-gen">
      <div className="s17-gen__left">
        <div className="kicker">GENERATING SHOTS</div>
        <div className="s17-counter big">
          <span className="now">{state.currentShot || done}</span>
          <span className="of">/ {total}</span>
        </div>
        <div className="s17-gen__meta">每一顆 10 秒 · 已完成 {done} 顆</div>
        <div className="bar">
          <i style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }} />
        </div>
        <p className="s17-gen__note">
          這些不是各自獨立的短片，是<b>同一個故事的連續段落</b> —— 所以每一顆都要接得上一顆。
        </p>
        {current && <ShotCard shot={current} expanded />}
      </div>

      <div className="s17-gen__right">
        <div className="shots strip">
          {state.shots.map((s) => (
            <div className={`chip-shot ${s.status}`} key={s.id}>
              <span className="i">{String(s.index).padStart(2, '0')}</span>
              <span className="s">{s.slug}</span>
              <span className="m">
                {s.status === 'done' ? '✓' : s.status === 'generating' ? '●' : '·'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Assembly and the finished cut belong to Scene 18 — this just hands over. */
function HandoffStage({ state }: { state: FilmState }) {
  const { run } = useFilmCommand()
  const ready = state.phase === 'ready'
  const pct = Math.round((state.assembly?.progress ?? 0) * 100)

  return (
    <div className="s17-handoff">
      <div className="kicker">{ready ? 'READY' : 'ASSEMBLING'}</div>
      <h3>{ready ? '成片完成' : `剪輯中 ${pct}%`}</h3>
      <p>{ready ? '' : (state.assembly?.step ?? '')}</p>
      <div className="ready-box">
        <span className="k">{ready ? 'READY' : 'CUTTING'}</span>
        <span className="v">
          按 <b style={{ color: 'var(--ink)' }}>→</b> 進下一頁
        </span>
      </div>
      {ready && (
        <button className="btn ghost" onClick={() => run((c) => c.resetSession())}>
          重跑一次
        </button>
      )}
    </div>
  )
}

/** One panel per phase — the room only ever shows the step it is actually on. */
function PhaseStage({ state }: { state: FilmState }) {
  switch (state.phase) {
    case 'collecting':
      return <CollectingStage state={state} />
    case 'locked':
      return <LockedStage state={state} />
    case 'directing':
      return <DirectingStage state={state} />
    case 'story':
      return <StoryStage state={state} />
    case 'shot_plan':
      return <ShotPlanStage state={state} />
    case 'generating':
      return <GeneratingStage state={state} />
    case 'assembling':
    case 'ready':
      return <HandoffStage state={state} />
  }
}

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
              <span>{PHASE_LABEL[state.phase]}</span>
              {state.styles.length > 0 && (
                <span className="count">{state.styles.length} 種風格</span>
              )}
            </div>
            <PhaseStage state={state} />
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
