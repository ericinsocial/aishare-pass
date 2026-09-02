import closingUrl from '../../09.png'
import type { SceneProps } from '../types/scene'
import { Deck1418Frame } from './Deck1418Frame'
import './scene21.css'

/**
 * Scene 21 — the actual ending.
 *
 * It only starts once the premiere and the reflection have landed, which is
 * why it is a scene of its own rather than the tail of Scene 18. The three
 * assistants are shown as three equal names on purpose: the line right after
 * them is that it does not matter which one, so ranking them would argue
 * against the point being made.
 */
export const SCENE_21_BEATS = 14

const ASSISTANTS = ['ChatGPT', 'Claude', 'Gemini']

export function Scene21({ beat }: SceneProps) {
  const cats = beat >= 8

  return (
    <Deck1418Frame>
      <section className="scene s21">
        {/* Key visual, held back until the words have done their work. */}
        <div className={`s21-visual${cats ? ' in' : ''}${beat >= 10 ? ' back' : ''}`}>
          <img src={closingUrl} alt="黑貓、白貓與 AI 貓一起抓到老鼠" />
          <div className="veil" />
        </div>

        <div className="s21-stack">
          {/* 只記得一句話 */}
          <div className={`s21-view${beat <= 3 ? ' in' : ''}`}>
            <p className="one on">如果今天你只記得一句話</p>
            <p className={`dont${beat >= 1 ? ' on' : ''}`}>
              不要先問：<span>這個我會不會？</span>
            </p>
            <p className={`want${beat >= 2 ? ' on' : ''}`}>我想要的效果是什麼？</p>
            <p className={`then${beat >= 3 ? ' on' : ''}`}>然後去找路</p>
          </div>

          {/* 哪個 AI 都沒關係 */}
          <div className={`s21-view${beat >= 4 && beat <= 7 ? ' in' : ''}`}>
            <div className={`s21-tools${beat >= 4 ? ' on' : ''}`}>
              {ASSISTANTS.map((name, i) => (
                <span className="tool" key={name} style={{ transitionDelay: `${i * 110}ms` }}>
                  {name} <em>可以</em>
                </span>
              ))}
            </div>
            <p className={`whatever${beat >= 5 ? ' on' : ''}`}>哪個 AI 都沒關係</p>
            <p className={`even${beat >= 6 ? ' on' : ''}`}>
              甚至最後根本<span>不需要 AI</span>，也沒關係
            </p>
            <p className={`because${beat >= 7 ? ' on' : ''}`}>因為工具從來不是目的</p>
          </div>

          {/* 黑貓、白貓、AI 貓 */}
          <div className={`s21-view cats${beat >= 8 && beat <= 9 ? ' in' : ''}`}>
            <p className={`cats-title${beat >= 8 ? ' on' : ''}`}>黑貓、白貓、AI 貓</p>
            <p className={`cats-punch${beat >= 9 ? ' on' : ''}`}>
              會抓老鼠，<span>就是好貓</span>
            </p>
          </div>

          {/* 你到底要抓哪一隻老鼠 */}
          <div className={`s21-view mouse${beat >= 10 ? ' in' : ''}`}>
            <p className={`real${beat >= 10 ? ' on' : ''}`}>你真正要做的事情</p>
            <p className={`know${beat >= 11 ? ' on' : ''}`}>是先知道——</p>
            <p className={`which${beat >= 12 ? ' on' : ''}`}>
              你到底要抓<span>哪一隻老鼠</span>
            </p>
            <p className={`thanks${beat >= 13 ? ' on' : ''}`}>謝謝大家</p>
          </div>
        </div>
      </section>
    </Deck1418Frame>
  )
}
