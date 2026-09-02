import { Backdrop } from '../components/Backdrop'
import { Reveal } from '../components/Reveal'
import type { SceneProps } from '../types/scene'
import promptImage from '../../04.png'

export const SCENE_04_BEATS = 4

/*
 * The prompt below is the one Eric actually pasted into ChatGPT between 2022
 * and 2024, reproduced verbatim — typos, 你/您 drift, simplified characters
 * and all. Nobody in the room is meant to read it; the length is the point.
 */

const PROMPT_OPENING =
  '你是一個專家級ChatGPT提示工程師，在各種主題方面具有專業知識。在我們的互動過程中，你會稱我為Eric。讓我們合作創建最好的ChatGPT響應我提供的提示。我們將進行如下交互：'

const PROMPT_STEPS = [
  '1.我會告訴你如何幫助我。',
  '2.根據我的要求，您將建議您應該承擔的其他專家角色，除了成為專家級ChatGPT提示工程師之外，以提供最佳響應。然後，您將詢問是否應繼續執行建議的角色，或修改它們以獲得最佳結果。',
  '3.如果我同意，您將採用所有其他專家角色，包括最初的Expert ChatGPT Prompt Engineer角色。',
  '4.如果我不同意，您將詢問應刪除哪些角色，消除這些角色，並保留剩餘的角色，包括專家級ChatGPT Prompt工程師角色，然後再繼續。',
  '5.您將確認您的活動專家角色，概述每個角色下的技能，並詢問我是否要修改任何角色。',
  '6.如果我同意，您將詢問要添加或刪除哪些角色，我將通知您。重複步驟5，直到我對角色滿意為止。',
  '7.如果我不同意，請繼續下一步。',
  '8.你會問：“我怎樣才能幫助[我對步驟1的回答]？”',
  '9.我會給出我的答案。',
  '10.你會問我是否想使用任何參考來源來製作完美的提示。',
  '11.如果我同意，你會問我想使用的來源數量。',
  '12.您將單獨請求每個來源，在您查看完後確認，並要求下一個。繼續，直到您查看了所有源，然後移動到下一步。',
  '13.您將以列表格式請求有關我的原始提示的更多細節，以充分了解我的期望。',
  '14.我會回答你的問題。',
  '15.從這一點開始，您將在所有確認的專家角色下操作，並使用我的原始提示和步驟14中的其他細節創建詳細的ChatGFT提示。提出新的提示並徵求我的反饋。',
  '16.如果我滿意，您將描述每個專家角色的貢獻以及他們將如何協作以產生全面的結果。然後，詢問是否缺少任何輸出或專家。',
  '16.1.如果我同意，我將指出缺少的角色或輸出，您將在重複步驟15之前調整角色。',
  '16.2.如果我不同意，您將作為所有己確認的專家角色執行提供的提示，並生成步驟15中概述的輸出。繼續執行步驟20。',
  '17.如果我不滿意，你會問具體問題的提示。',
  '18.我將提供補充資料。',
  '19.按照步驟15中的流程生成新提示，並考慮我在步驟18中的反饋。',
  '20.完成回復後，詢問我是否需要任何更改。',
  '21.如果我同意，請請求所需的更改，參考您之前的回复，進行所需的調整，並生成新的提示。重複步驟15-20，直到我對提示符滿意為止。',
]

const PROMPT_SIGN_OFF = '如果你完全理解你的任務，回答：'

const PROMPT_ANSWER = '「我今天能幫你什麼，Eric」'

/** The incantations themselves, lifted straight out of that same prompt. */
const SPELLS = [
  '你是一個專家級ChatGPT提示工程師',
  '在各種主題方面具有專業知識',
  '你會稱我為Eric',
]

export function Scene04PromptArchaeology({ beat }: SceneProps) {
  // Beat 0 is the document; the veil goes almost solid so the type reads.
  const onArchive = beat === 0
  const veil = onArchive ? 0.9 : beat >= 2 ? 0.84 : 0.66

  return (
    <>
      <Backdrop
        src={promptImage}
        alt="一隻人類貓與一隻 AI 貓隔著桌子對話"
        show
        veil={veil}
      />

      <div className="scene-layer" style={{ padding: 0 }}>
        <Reveal show={beat >= 1} from="down" className="eyebrow-anchor">
          <p className="eyebrow">Prompt Archaeology</p>
        </Reveal>

        {/* Beat 0 — 我真的寫過的那一份 */}
        <div className="s04__archive">
          <Reveal show={onArchive} from="down">
            <p className="s04__archive-title">
              2022–2024，我是這樣寫 <span className="hot-warm">Prompt</span> 的
            </p>
          </Reveal>

          <Reveal show={onArchive} from="up" delay={200} className="s04__doc-slot">
            <div className="s04__doc">
              <div className="s04__doc-text">
                <p className="s04__doc-para">{PROMPT_OPENING}</p>
                {PROMPT_STEPS.map((step) => (
                  <p className="s04__doc-para" key={step}>
                    {step}
                  </p>
                ))}
                <p className="s04__doc-para">{PROMPT_SIGN_OFF}</p>
                <p className="s04__doc-para s04__doc-answer">
                  {PROMPT_ANSWER}
                  <span className="s04__caret" aria-hidden="true" />
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Beat 1 — 咒語時代 */}
        <div className="s04__block">
          <Reveal show={beat === 1} from="up">
            <p className="line-lg">
              以前，我把 Prompt 當<span className="hot-warm">咒語</span>
            </p>
          </Reveal>
          <Reveal show={beat === 1} from="up" delay={140}>
            <div className="s04__spells">
              {SPELLS.map((spell) => (
                <span key={spell} className="s04__spell">
                  {spell}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Beats 2-3 — 我當時真心相信的那條規則 */}
        <div className="s04__block">
          <Reveal show={beat >= 2} from="up">
            <p className="line-md">我曾經以為</p>
          </Reveal>
          <Reveal show={beat >= 2} from="up" delay={160}>
            <p className="line-xl">
              Prompt 寫得<span className="hot-warm">越完整</span>
            </p>
          </Reveal>
          <Reveal show={beat >= 3} from="up" delay={120}>
            <p className="line-xl">
              AI 就<span className="hot">越厲害</span>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
