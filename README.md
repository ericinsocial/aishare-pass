# AISHARE

16:9 全螢幕互動式簡報，現場投影用

## 技術

React + TypeScript + Vite，hash routing，純前端（沒有後端、沒有 AI API、沒有 Worker）

## 開發

```bash
npm install
npm run dev        # 開發
npm run typecheck  # tsc -b
npm run build      # 產出 dist/
npm run preview    # 預覽 build 結果
```

`vite.config.ts` 使用 `base: './'` 搭配 hash routing，`dist/` 可直接放上 GitHub Pages

## Presenter 操作

網址格式：

```
#/presenter/:scene/:beat
```

- `ArrowRight` 下一個 beat
- `ArrowLeft` 上一個 beat
- 走到 scene 結尾會接到下一個 scene，不會重新整理頁面
- 沒有 autoplay，每一個 beat 都由講者按鍵控制

## Scene 與 beat

| Scene | 內容 | Beats | 起始網址 |
| --- | --- | --- | --- |
| 01 | Strawberry 測試 | 11 | `#/presenter/01/0` |
| 02 | AI 能力時間線 | 5 | `#/presenter/02/0` |
| 03 | AI 翻車 | 4 | `#/presenter/03/0` |
| 04 | Prompt Archaeology | 4 | `#/presenter/04/0` |
| 05 | Prompt 五大元素 | 8 | `#/presenter/05/0` |
| 06 | Conversation | 8 | `#/presenter/06/0` |
| 08 | IDEA → REALITY | 7 | `#/presenter/08/0` |
| 09 | 主題揭露：會抓老鼠就是好貓 | 6 | `#/presenter/09/0` |
| 10 | AI 工作流程 | 5 | `#/presenter/10/0` |
| 11 | REAL WORK | 5 | `#/presenter/11/0` |
| 12 | 罵得有規格 | 6 | `#/presenter/12/0` |
| 14 | DONE ≠ RIGHT | 9 | `#/presenter/14/0` |
| 15 | 方法論 recap | 8 | `#/presenter/15/0` |
| 16 | Showtime 轉場 | 4 | `#/presenter/16/0` |
| 17 | AI Production Room | 1 | `#/presenter/17/0` |
| 18 | Premiere | 5 | `#/presenter/18/0` |

Scene 07 與 Scene 13 沒有排進 deck，編號刻意不補。

### Scene 01 beat 對照

| Beat | 內容 |
| --- | --- |
| 0 | 在開始之前... |
| 1 | 你以為 AI 很聰明？ |
| 2 | 2022：完整顯示 strawberry |
| 3 | 2022：第一個 R 發亮 |
| 4 | 2022：後續兩個 R 一起發亮 |
| 5 | 2022：AI 回答「2 個」 |
| 6 | 2026：完整顯示 strawberry |
| 7 | 2026：第一個 R |
| 8 | 2026：第二個 R |
| 9 | 2026：第三個 R |
| 10 | 2026：AI 回答「3 個」 |

### Scene 14–18

| Scene | 內容 |
| --- | --- |
| 14 | AI 回報 `DONE ✓`，人類逐項驗收後爆出問題，收在「完成 ≠ 正確／驗收才是最後一步」 |
| 15 | 💡想 → 💬說 → ⚙️做 → 👀看 → 🔁改，收在「AI 不能替你『想要』」 |
| 16 | 進 Live 前的 showtime 轉場：從「我做給你看」翻成「換我們一起做」 |
| 17 | 投稿牆 → LOCK → Host 選風格（複選）→ 開始寫腳本 → reading → story → shot plan → generating → assembling → ready |
| 18 | 預留 16:9 成片版位 + Credits，最後以 `09.png` 作 closing callback |

素材：Scene 17 使用 `DROPTHEBEE.png`，Scene 18 結尾使用 `09.png`。

Scene 17 是唯一由畫面互動（而非按鍵 beat）推進的場次，因此只有 1 個 beat：
LOCK、風格選擇、開始寫腳本都是點擊操作。

## 目錄

```
src/
  app/         路由、鍵盤控制、App shell
  components/  Stage、Backdrop、Reveal、PresenterChrome
  film/        Scene 17 / 18 的 FilmState 與 FilmSessionClient（本輪為 mock）
  scenes/      每個 scene 一個檔案，index.ts 是 deck 順序
  styles/      global / stage / scenes / scenes1418
  types/       Scene 與 beat 型別
```

Scene 圖片直接引用 repo 根目錄的原圖，未經修改

## Scene 09–12

- Scene09 使用根目錄的 `09.png` 作為主視覺。
- Scene11 會用 `import.meta.glob` 自動掃描根目錄所有 `cibar-*` 圖片組成展示牆；
  新增圖片只要放進根目錄就會出現，標題可在 `Scene11.tsx` 的 `CAPTIONS` 補上。
  沒有實際截圖的項目（公司網站／CRM／活動管理）一律以文字 UI card 呈現並標記
  「文字示意」，不生成假截圖。
- 這四個 scene 的色票與進場動畫放在 `src/styles/scenes0912.css`，
  scope 在 `.deck0912` 之下。這裡的 `--ink` 指的是深色底，
  和 `global.css` 中代表淺色字的 `--ink` 意義相反，所以刻意不掛在 `:root`。
- 進場動畫用 `src/components/Rise.tsx`（可指定標籤、可疊加 modifier），
  與共用的 `Reveal` 並存。

## Scene 17 / 18：mock → Live Session 的替換點

Scene 17 / 18 **完全是 mock state**：沒有後端、沒有 Worker、沒有 secrets、沒有任何
API 呼叫（fal.ai / OpenRouter / LTX 皆未接）。Scene 18 credits 裡的
`AI Director / Model Routing / Video Generation / AI Platform / Video Assembly`
是**未來**正式 runtime 的 production credits 文案，不是本輪實際跑過的東西。

`FilmState` 從一開始就寫成「伺服器會給的樣子」：可序列化、帶單調遞增的 `revision`。
UI 永遠只做兩件事 —— **讀 snapshot**、**送 command**，沒有任何畫面自己跑進度。

```
src/film/
  types.ts          FilmState / FilmPhase / Submission / Shot / Story / 風格清單
  client.ts         FilmSessionClient 介面（getSnapshot / subscribe / commands）
  mockClient.ts     MockFilmSessionClient — 本輪用的記憶體版狀態機
  factory.ts        createFilmSessionClient() ← 唯一的替換點
  FilmProvider.tsx  useFilmState() / useFilmCommand()
  selectors.ts      Scene 18 credits 由 FilmState 推導
```

接上真的 Live Session 時，只要實作同一個 `FilmSessionClient`（WebSocket/SSE 收
snapshot、HTTP 送 command），然後改 `factory.ts` 的一行：

```ts
return new LiveFilmSessionClient(import.meta.env.VITE_FILM_SESSION_URL)
```

Scene 17 / 18 的 UI 不需要重寫 —— 沒有任何場景直接 import 過 mock。
