import Rise from '../components/Rise.jsx'
import './Scene11.css'

/* Scan the repo for every cibar-* screenshot. New ones dropped into the
   repo root show up on the wall automatically — no code change needed. */
const scanned = import.meta.glob('../../cibar-*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/* Captions for the shots we have. Anything unrecognised still shows up,
   labelled from its filename, rather than being silently dropped. */
const CAPTIONS = {
  'cibar-home': { title: '體驗首頁', sub: 'AR 詐騙體驗入口' },
  'cibar-ar-scan': { title: 'AR 掃描', sub: '對準可疑物件' },
  'cibar-blackpi-home': { title: '假電商', sub: '黑皮購物情境' },
  'cibar-dating-app': { title: '假交友 App', sub: 'MeetU 情境' },
  'cibar-dating-video': { title: 'AI 假視訊', sub: '交友詐騙' },
  'cibar-fake-police-call': { title: '假警察來電', sub: '來電顯示可偽造' },
  'cibar-investment-video': { title: 'AI 假老師', sub: '投資詐騙' },
}

const ORDER = [
  'cibar-home',
  'cibar-ar-scan',
  'cibar-blackpi-home',
  'cibar-dating-app',
  'cibar-dating-video',
  'cibar-fake-police-call',
  'cibar-investment-video',
]

const SHOTS = Object.entries(scanned)
  .map(([path, src]) => {
    const key = path.split('/').pop().replace(/\.\w+$/, '')
    return { key, src, ...(CAPTIONS[key] ?? { title: key, sub: '' }) }
  })
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.key)
    const ib = ORDER.indexOf(b.key)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })

/* Real work without a screenshot in the repo — shown as text/UI cards,
   deliberately not as invented screenshots. */
const OTHER_WORK = [
  {
    title: '公司網站',
    lines: ['形象頁與服務說明', '手機版重排', '自己改、當天上線'],
  },
  {
    title: 'CRM',
    lines: ['客戶名單集中管理', '跟進進度一眼看完', '報表不用再手拉'],
  },
  {
    title: '活動管理',
    lines: ['報名與名單匯出', '現場報到流程', '結案數字自動出'],
  },
]

export default function Scene11({ step }) {
  const docked = step >= 1
  const finale = step >= 4

  return (
    <div className="scene s11">
      <div className="grain" />

      <div className={`s11__body ${finale ? 'dimmed' : ''}`}>
        <header className={`s11__head ${docked ? 'is-docked' : ''}`}>
          <Rise show className="kicker">
            Scene 11 — Real Work
          </Rise>
          <Rise show delay={120} as="h2" className="s11__h2">
            實際<span className="hl-amber">做出來</span>的東西
          </Rise>
          <Rise show={!docked} delay={320} as="p" className="s11__lede">
            這一頁沒有理論
          </Rise>
        </header>

        {/* --- Dynamic screenshot wall --- */}
        <div className={`s11__wall ${docked ? 'is-on' : ''}`}>
          <div className="s11__track">
            {[0, 1].map((dup) => (
              <div className="s11__set" key={dup} aria-hidden={dup === 1}>
                {SHOTS.map((s) => (
                  <figure className="s11__shot" key={`${dup}-${s.key}`}>
                    <div className="s11__phone">
                      <img src={s.src} alt={`${s.title} — ${s.sub}`} />
                    </div>
                    <figcaption>
                      <b>{s.title}</b>
                      <span>{s.sub}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <div className="s11__wall-fade s11__wall-fade--l" />
          <div className="s11__wall-fade s11__wall-fade--r" />
        </div>

        {/* --- Project row --- */}
        <div className="s11__projects">
          <Rise show={step >= 2} variant="pop" className="s11__proj s11__proj--hero">
            <span className="s11__badge s11__badge--real">實際畫面</span>
            <p className="s11__proj-org">內政部警政署刑事警察局</p>
            <p className="s11__proj-title">沉浸式 AR 詐騙體驗</p>
            <p className="s11__proj-meta">
              {SHOTS.length} 個情境模組 · AR 辨識 · AI 影片 · 互動流程
            </p>
          </Rise>

          {OTHER_WORK.map((w, i) => (
            <Rise
              key={w.title}
              show={step >= 3}
              delay={i * 140}
              variant="pop"
              className="s11__proj"
            >
              <span className="s11__badge">文字示意</span>
              <p className="s11__proj-title s11__proj-title--sm">{w.title}</p>
              <ul className="s11__proj-list">
                {w.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Rise>
          ))}
        </div>
      </div>

      {/* --- Finale --- */}
      <div className={`s11__finale ${finale ? 'is-on' : ''}`}>
        <Rise show={finale} variant="pop" as="p" className="s11__finale-a">
          不是我學會了多少工具
        </Rise>
        <Rise
          show={finale}
          delay={450}
          variant="pop"
          as="p"
          className="s11__finale-b"
        >
          而是我<span className="hl-amber">到底做出了什麼</span>
        </Rise>
      </div>
    </div>
  )
}
