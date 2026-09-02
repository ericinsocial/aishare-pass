import type { SceneProps } from '../types/scene'
import Rise from '../components/Rise'
import Paw from '../components/Paw'
import keyVisual from '../../09.png'
import './Scene09.css'

/* Different mice go to different cats — the cats are identified by the
   colours in the key visual, never by a personality label. */
const ROUTES = [
  { mouse: '找資料的老鼠', cat: 'cat--black' },
  { mouse: '寫程式的老鼠', cat: 'cat--grey' },
  { mouse: '做圖的老鼠', cat: 'cat--white' },
]

export const SCENE_09_BEATS = 6

export function Scene09({ beat }: SceneProps) {
  const docked = beat >= 2
  const finale = beat >= 5

  return (
    <div className="scene deck0912 s9">
      <div
        className={`s9__visual ${beat >= 1 ? 'is-scrimmed' : ''} ${
          finale ? 'is-finale' : ''
        }`}
      >
        <img src={keyVisual} alt="黑貓、白貓與 AI 貓一起抓到老鼠的主視覺" />
        <div className="s9__scrim" />
      </div>

      <div className={`s9__body ${finale ? 'dimmed' : ''}`}>
        {/* Title — centre stage at beat 1, docked top-left from beat 2 on. */}
        <div className={`s9__title ${docked ? 'is-docked' : ''}`}>
          <Rise show={beat >= 1} as="h1" className="s9__h1">
            <span>《黑貓、白貓、AI 貓：</span>
            <span>會抓老鼠就是好貓》</span>
          </Rise>
          <Rise show={beat >= 1} delay={220} as="p" className="s9__sub">
            <span>AI 時代，從「我會不會」</span>
            <span>到「我做不做得出來」</span>
          </Rise>
        </div>

        <div className="s9__lines">
          <Rise show={beat >= 2} variant="left" className="s9__line s9__line--no">
            <span className="s9__mark">✕</span>
            <span>我不是在找一個什麼都會的 AI</span>
          </Rise>

          <Rise
            show={beat >= 3}
            variant="left"
            className="s9__line s9__line--yes"
          >
            <span className="s9__mark">
              <Paw size={30} />
            </span>
            <span>
              我是在組 <em>AI Team</em>
            </span>
          </Rise>

          <Rise
            show={beat >= 4}
            variant="left"
            className="s9__line s9__line--yes"
          >
            <span className="s9__mark">
              <Paw size={30} />
            </span>
            <span>不同的老鼠，放不同的貓</span>
          </Rise>

          <div className="s9__routes">
            {ROUTES.map((r, i) => (
              <Rise
                key={r.mouse}
                show={beat >= 4}
                delay={320 + i * 160}
                variant="left"
                className="s9__route"
              >
                <span className="s9__mouse">{r.mouse}</span>
                <span className="s9__arrow" />
                <span className={`s9__cat ${r.cat}`}>
                  <Paw size={26} />
                </span>
              </Rise>
            ))}
          </div>
        </div>
      </div>

      {/* Finale */}
      <div className={`s9__finale ${finale ? 'is-on' : ''}`}>
        <Rise show={finale} variant="pop" as="p" className="s9__finale-text">
          會抓老鼠，<span className="hl-amber">就是好貓</span>
        </Rise>
      </div>
    </div>
  )
}
