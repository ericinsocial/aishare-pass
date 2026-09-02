# aishare

《會抓老鼠，就是好貓》分享會的簡報前端 — 本 repo 目前收錄 **Scene 14 – Scene 18**。

> Scene 13 沒有最終版本，因此刻意不存在，也不補。

## 執行

```bash
npm install
npm run dev     # 本機預覽
npm run build   # 產出 dist/
```

操作：`←` / `→`（或空白鍵）逐步推進，`1`–`5` 直接跳到 Scene 14–18。

## 場次

| Scene | 內容 |
| --- | --- |
| 14 | **DONE ≠ RIGHT** — AI 回報 `DONE ✓`，人類逐項驗收後爆出問題，收在「完成 ≠ 正確／驗收才是最後一步」 |
| 15 | 方法論 recap — 💡想 → 💬說 → ⚙️做 → 👀看 → 🔁改，收在「AI 不能替你『想要』」 |
| 16 | 進 Live 前的 showtime 轉場：從「我做給你看」翻成「換我們一起做」 |
| 17 | **AI Production Room** — 投稿牆 → LOCK → Host 選風格（複選）→ 開始寫腳本 → reading → story → shot plan → generating → assembling → ready |
| 18 | **Premiere** — 預留 16:9 成片版位 + Credits，最後以 `09.png` 作 closing callback |

素材：Scene 17 使用 `DROPTHEBEE.png`，Scene 18 結尾使用 `09.png`。

## 這一輪沒有做的事

Scene 17 / 18 **完全是 mock state**：沒有後端、沒有 Worker、沒有 secrets、沒有任何
API 呼叫（fal.ai / OpenRouter / LTX 皆未接）。Scene 18 credits 裡的
`AI Director / Model Routing / Video Generation / AI Platform / Video Assembly`
是**未來**正式 runtime 的 production credits 文案，不是本輪實際跑過的東西。

## Mock → Live Session 的替換點

`FilmState` 從一開始就寫成「伺服器會給的樣子」：可序列化、帶單調遞增的 `revision`。
UI 永遠只做兩件事 —— **讀 snapshot**、**送 command**，沒有任何畫面自己跑進度。

```
src/film/
  types.ts        FilmState / FilmPhase / Submission / Shot / Story / 風格清單
  client.ts       FilmSessionClient 介面（getSnapshot / subscribe / commands）
  mockClient.ts   MockFilmSessionClient — 本輪用的記憶體版狀態機
  factory.ts      createFilmSessionClient() ← 唯一的替換點
  FilmProvider.tsx  useFilmState() / useFilmCommand()
  selectors.ts    Scene18 credits 由 FilmState 推導
```

接上真的 Live Session 時，只要實作同一個 `FilmSessionClient`（WebSocket/SSE 收
snapshot、HTTP 送 command），然後改 `factory.ts` 的一行：

```ts
return new LiveFilmSessionClient(import.meta.env.VITE_FILM_SESSION_URL)
```

Scene 17 / 18 的 UI 不需要重寫 —— 沒有任何場景直接 import 過 mock。
