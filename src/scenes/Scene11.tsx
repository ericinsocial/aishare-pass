import type { SceneProps } from '../types/scene'
import Rise from '../components/Rise'
import './Scene11.css'

/* Scan the repo for every cibar-* screenshot. New ones dropped into the
   repo root show up on the wall automatically — no code change needed. */
const scanned = import.meta.glob<string>('../../cibar-*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/* Captions for the shots we have. Anything unrecognised still shows up,
   labelled from its filename, rather than being silently dropped. */
interface Caption {
  title: string
  sub: string
}

const CAPTIONS: Record<string, Caption> = {
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
    const key = (path.split('/').pop() ?? '').replace(/\.\w+$/, '')
    return { key, src, ...(CAPTIONS[key] ?? { title: key, sub: '' }) }
  })
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.key)
    const ib = ORDER.indexOf(b.key)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })

/* What the project above actually needed. This is not a list of jobs I have
   done — it is the list of things I could not do, which is the only reason
   the card next to the screenshots is worth showing at all. */
const NOT_MY_FIELD = ['AR 辨識', 'App 開發', 'AI 影片', '互動流程', '後端串接']

export const SCENE_11_BEATS = 5

export function Scene11({ beat }: SceneProps) {
  const docked = beat >= 1
  const finale = beat >= 4

  return (
    <div className="scene deck0912 s11">
      <div className="grain" />

      <div className={`s11__body ${finale ? 'dimmed' : ''}`}>
        <header className={`s11__head ${docked ? 'is-docked' : ''}`}>
          <Rise show className="kicker">
            Real Work
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
          <Rise show={beat >= 2} variant="pop" className="s11__proj s11__proj--hero">
            <span className="s11__badge s11__badge--real">實際畫面</span>
            <p className="s11__proj-title s11__proj-title--hero">
              刑事警察局反詐 AR APP
            </p>
            <p className="s11__proj-meta">
              {SHOTS.length} 個情境模組 · AR 辨識 · AI 影片 · 互動流程
            </p>
            {/* The modules are the ones already captioned on the wall above,
                so the card names what is on screen instead of restating it. */}
            <div className="s11__skills">
              {SHOTS.map((shot, i) => (
                <Rise
                  key={shot.key}
                  show={beat >= 2}
                  delay={200 + i * 70}
                  variant="pop"
                  className="s11__skill"
                >
                  {shot.title}
                </Rise>
              ))}
            </div>
          </Rise>

          <Rise
            show={beat >= 3}
            variant="pop"
            className="s11__proj s11__proj--mine"
          >
            <span className="s11__badge">原本不是我的專業</span>
            <p className="s11__proj-title s11__proj-title--sm">這些我原本都不會</p>
            <div className="s11__skills">
              {NOT_MY_FIELD.map((skill, i) => (
                <Rise
                  key={skill}
                  show={beat >= 3}
                  delay={160 + i * 90}
                  variant="pop"
                  className="s11__skill"
                >
                  {skill}
                </Rise>
              ))}
            </div>
            <p className="s11__proj-done">但東西最後做出來了</p>
          </Rise>
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
