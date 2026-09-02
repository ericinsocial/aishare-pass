import type { CSSProperties } from 'react'
import type { SceneProps } from '../types/scene'
import Rise from '../components/Rise'
import Paw from '../components/Paw'
import './Scene10.css'

const HUMAN = [
  { title: '目標', desc: '要解決什麼問題' },
  { title: '判斷', desc: '這個方向對不對' },
  { title: '驗收', desc: '這樣算不算做完' },
]

/* Roles, not products — this is a division of labour, not a tool ranking. */
const AI_ROLES = [
  { title: '找資料', desc: '把散在各處的東西撈回來', tone: 'a' },
  { title: '寫草稿', desc: '先給我一個能改的版本', tone: 'b' },
  { title: '寫程式', desc: '把想法變成可以跑的東西', tone: 'c' },
  { title: '做畫面', desc: '視覺、素材、影片', tone: 'd' },
  { title: '挑錯', desc: '專門找我沒看到的洞', tone: 'e' },
]

export const SCENE_10_BEATS = 5

export function Scene10({ beat }: SceneProps) {
  const finale = beat >= 4

  return (
    <div className="scene deck0912 s10">
      <div className="grain" />

      <div className={`s10__body ${finale ? 'dimmed' : ''}`}>
        <header className="s10__head">
          <Rise show className="kicker">
            Scene 10 — AI 工作流程
          </Rise>
          <Rise show delay={120} as="h2" className="s10__h2">
            人負責什麼，<span className="hl-amber">AI 負責什麼</span>
          </Rise>
        </header>

        {/* --- Human band --- */}
        <section className="s10__band s10__band--human">
          <Rise show variant="left" className="s10__band-label">
            <span className="s10__band-tag">人類</span>
            <span className="s10__band-note">只有一個，而且不能外包</span>
          </Rise>

          <div className="s10__cards">
            {HUMAN.map((h, i) => (
              <Rise
                key={h.title}
                show
                delay={200 + i * 130}
                variant="pop"
                className="s10__card s10__card--human"
              >
                <p className="s10__card-title">{h.title}</p>
                <p className="s10__card-desc">{h.desc}</p>
              </Rise>
            ))}
          </div>
        </section>

        {/* --- Dispatch --- */}
        <div className={`s10__flow s10__flow--down ${beat >= 2 ? 'is-on' : ''}`}>
          <span className="s10__flow-label">派工</span>
          <div className="s10__rails">
            {AI_ROLES.map((r, i) => (
              <span
                key={r.title}
                className="s10__rail"
                style={{ '--i': i } as CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* --- AI band --- */}
        <section className="s10__band s10__band--ai">
          <Rise show={beat >= 1} variant="left" className="s10__band-label">
            <span className="s10__band-tag s10__band-tag--ai">AI Team</span>
            <span className="s10__band-note">一隻貓，抓一種老鼠</span>
          </Rise>

          <div className="s10__cards">
            {AI_ROLES.map((r, i) => (
              <Rise
                key={r.title}
                show={beat >= 1}
                delay={i * 110}
                variant="pop"
                className={`s10__card s10__card--ai tone-${r.tone}`}
              >
                <span className="s10__paw">
                  <Paw size={26} />
                </span>
                <p className="s10__card-title">{r.title}</p>
                <p className="s10__card-desc">{r.desc}</p>
              </Rise>
            ))}
          </div>
        </section>

        {/* --- Return + reject loop --- */}
        <Rise show={beat >= 3} className="s10__return">
          <span className="s10__return-arrow" />
          <span className="s10__return-text">
            交回 → 人驗收
          </span>
          <span className="s10__return-reject">不合格就退回重做</span>
        </Rise>
      </div>

      {/* --- Finale --- */}
      <div className={`s10__finale ${finale ? 'is-on' : ''}`}>
        <Rise show={finale} variant="pop" as="p" className="s10__finale-a">
          人決定<span className="hl-amber">什麼叫對</span>
        </Rise>
        <Rise
          show={finale}
          delay={420}
          variant="pop"
          as="p"
          className="s10__finale-b"
        >
          AI 負責<span className="hl-cyan">怎麼做出來</span>
        </Rise>
      </div>
    </div>
  )
}
