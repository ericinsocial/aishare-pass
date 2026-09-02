import Rise from '../components/Rise.jsx'
import './Scene12.css'

const VAGUE = ['這什麼鬼', '不好看', '不對', '再改']

const SPEC = ['標題太小', '主視覺被壓縮', 'CTA 不夠明顯', '不要改其他區塊']

const ANATOMY = [
  { label: '哪裡錯', example: '標題太小' },
  { label: '為什麼錯', example: '台下看不到' },
  { label: '要改成什麼', example: '放大兩倍' },
]

export default function Scene12({ step }) {
  const docked = step >= 1
  const finale = step >= 5

  return (
    <div className="scene s12">
      <div className="grain" />

      <div className={`s12__body ${finale ? 'dimmed' : ''}`}>
        <header className={`s12__head ${docked ? 'is-docked' : ''}`}>
          <Rise show className="kicker">
            Scene 12 — 怎麼跟 AI 說「改」
          </Rise>
          <Rise show delay={120} as="h2" className="s12__h2">
            AI 改不對，<span className="hl-amber">通常是我沒講清楚</span>
          </Rise>
        </header>

        <div className={`s12__cols ${docked ? 'is-on' : ''}`}>
          {/* --- BEFORE --- */}
          <section className="s12__col s12__col--bad">
            <Rise show={step >= 1} className="s12__col-tag">
              <span className="s12__x">✕</span> 沒有規格的罵
            </Rise>

            <div className="s12__chat">
              {VAGUE.map((t, i) => (
                <Rise
                  key={t}
                  show={step >= 1}
                  delay={i * 260}
                  variant="pop"
                  className="s12__bubble s12__bubble--me s12__bubble--angry"
                >
                  {t}
                </Rise>
              ))}

              <Rise
                show={step >= 2}
                variant="pop"
                className="s12__bubble s12__bubble--ai"
              >
                好的，我幫你整份重做。
              </Rise>
            </div>

            <Rise show={step >= 2} delay={300} className="s12__result s12__result--bad">
              動到不該動的地方 → 越改越爛
            </Rise>
          </section>

          {/* --- transform --- */}
          <div className={`s12__gutter ${step >= 3 ? 'is-on' : ''}`}>
            <span className="s12__gutter-line" />
            <span className="s12__gutter-chip">升級</span>
            <span className="s12__gutter-line" />
          </div>

          {/* --- AFTER --- */}
          <section className="s12__col s12__col--good">
            <Rise show={step >= 3} className="s12__col-tag">
              <span className="s12__check">✓</span> 有規格的罵
            </Rise>

            <div className="s12__chat">
              <Rise
                show={step >= 3}
                variant="pop"
                className="s12__bubble s12__bubble--me s12__bubble--ghost"
              >
                這什麼鬼
              </Rise>

              <Rise show={step >= 3} delay={200} className="s12__morph">
                ↓ 同一句話，講成規格
              </Rise>

              <Rise
                show={step >= 3}
                delay={340}
                variant="pop"
                className="s12__bubble s12__bubble--me s12__bubble--spec"
              >
                <ul>
                  {SPEC.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Rise>

              <Rise
                show={step >= 3}
                delay={760}
                variant="pop"
                className="s12__bubble s12__bubble--ai"
              >
                收到。只動這三個地方，其他不碰。
              </Rise>
            </div>

            <Rise
              show={step >= 3}
              delay={980}
              className="s12__result s12__result--good"
            >
              一次改到位 → 其他區塊沒被動到
            </Rise>
          </section>
        </div>

        {/* --- Anatomy of actionable feedback --- */}
        <div className="s12__anatomy">
          {ANATOMY.map((a, i) => (
            <Rise
              key={a.label}
              show={step >= 4}
              delay={i * 180}
              variant="pop"
              className="s12__anat"
            >
              <p className="s12__anat-label">{a.label}</p>
              <p className="s12__anat-eg">{a.example}</p>
            </Rise>
          ))}
        </div>
      </div>

      {/* --- Finale --- */}
      <div className={`s12__finale ${finale ? 'is-on' : ''}`}>
        <Rise show={finale} variant="pop" as="p" className="s12__finale-text">
          可以罵，
          <br />
          但要<span className="hl-amber">罵得有規格</span>
        </Rise>
      </div>
    </div>
  )
}
