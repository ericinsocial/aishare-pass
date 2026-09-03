import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene14.css'

const AI_CLAIMS = ['需求全部實作完成', '所有測試通過', '沒有已知問題']

const ISSUES: Array<[string, string]> = [
  ['送出按鈕按下去沒反應', '它只做了畫面，沒接送出'],
  ['手機打開整個跑版', '它只在自己想像的螢幕寬度測過'],
  ['錯誤訊息顯示 undefined', '例外處理是空的'],
  ['重新整理資料就不見了', '「先存在記憶體」後來沒有人回來改'],
  ['我沒說要改的地方被改掉了', '順手「優化」了兩個不相干的檔案'],
  ['測試是它寫的，也是它說通過的', '沒有人驗過那份測試在測什麼'],
]

export const SCENE_14_BEATS = 9

export function Scene14({ beat }: SceneProps) {
  const step = beat

  const issuesShown = Math.min(Math.max(step, 0), ISSUES.length)
  const busted = step >= ISSUES.length + 1
  const final = step >= ISSUES.length + 2

  return (
    <Deck1418Frame>
    <section className="scene s14">
      <div className="scene-kicker">Done ≠ Right</div>

      <h1 className="punch" style={{ fontSize: 46, margin: '22px 0 0' }}>
        AI 說完成，<span style={{ color: 'var(--red)' }}>不代表完成</span>
      </h1>

      <div className="s14-body">
        <div className={`s14-done${busted ? ' busted' : ''}`}>
          <div className="who">AI · 回報</div>
          <div className="verdict punch">
            DONE <span style={{ fontSize: 44 }}>✓</span>
          </div>
          <ul>
            {AI_CLAIMS.map((c) => (
              <li key={c}>
                <b>✓</b>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className={`s14-stamp${busted ? ' on' : ''}`}>REJECTED</div>
        </div>

        <div>
          <div className="s14-check-head">
            <span style={{ fontSize: 18 }}>👀</span>
            人類實際打開來看
            <span style={{ color: 'var(--red)' }}>
              {issuesShown > 0 ? `${issuesShown} 個問題` : ''}
            </span>
          </div>
          <div className="s14-issues">
            {ISSUES.map(([title, why], i) => (
              <div key={title} className={`s14-issue${i < issuesShown ? ' in' : ''}`}>
                <div className="x">✕</div>
                <div className="t">
                  {title}
                  <small>{why}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`s14-final${final ? ' in' : ''}`}>
        <div className="eq punch">
          完成 <span className="no">≠</span> <span className="yes">正確</span>
        </div>
        <div className="sub">
          <b>驗收</b>，才是最後一步
        </div>
      </div>
    </section>
    </Deck1418Frame>
  )
}
