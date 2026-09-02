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

### 部署後畫面全黑的自動復原

GitHub Pages 每次部署都會換掉所有帶 hash 的檔名（`index-XXXX.js`），舊檔案立刻從
伺服器上消失，但 `index.html` 本身帶著約 10 分鐘的快取。所以剛部署完的那幾分鐘，
瀏覽器可能拿著**舊的 `index.html`** 去要一個**已經不存在的 bundle** —— JS 404、
React 沒掛載、`#root` 是空的，畫面就是**全黑**，看起來像整個網站掛掉。

兩層防護：

1. **`#root` 裡有一段開機提示**。React 掛載時會蓋掉它，所以它只會在「頁面下載到了、
   但 bundle 沒跑起來」時出現。全黑的畫面什麼都不告訴你，這段文字至少講清楚是哪一種
   失敗，上台時這個差別很重要。
2. **`index.html` 開頭的 inline script**。`load` 之後再等 3 秒，如果 `#root` 仍然是
   空的（或還停在開機提示），就用 `?v=<timestamp>` 重新抓一次頁面繞過快取。

判斷條件刻意是「**畫面真的沒掛載**」，而不是「有某個資源載入失敗」—— error listener
連 favicon 或瀏覽器外掛塞進來的標籤失敗都會觸發，為了那種東西跳轉會把一個本來正在
正常載入的頁面打斷。只重試一次（避免無限 reload），並保留 hash 裡的 scene/beat，
所以就算講到一半才觸發，也會回到原本那一頁。

手動解法一樣是 `Ctrl/Cmd + Shift + R` 強制重整。

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

| # | Scene | 內容 | Beats | 起始網址 |
| --- | --- | --- | --- | --- |
| 1 | 01 | Strawberry 測試 | 11 | `#/presenter/01/0` |
| 2 | 02 | AI 能力時間線 | 7 | `#/presenter/02/0` |
| 3 | 03 | AI 翻車 | 4 | `#/presenter/03/0` |
| 4 | 04 | Prompt Archaeology | 4 | `#/presenter/04/0` |
| 5 | 05 | Prompt 五大元素 | 8 | `#/presenter/05/0` |
| 6 | 06 | Conversation | 8 | `#/presenter/06/0` |
| 7 | 08 | IDEA → REALITY | 7 | `#/presenter/08/0` |
| 8 | 09 | 主題揭露：會抓老鼠就是好貓 | 6 | `#/presenter/09/0` |
| 9 | 10 | AI 工作流程 | 5 | `#/presenter/10/0` |
| 10 | 11 | REAL WORK | 5 | `#/presenter/11/0` |
| 11 | 14 | DONE ≠ RIGHT | 9 | `#/presenter/14/0` |
| 12 | 12 | 罵得有規格 | 6 | `#/presenter/12/0` |
| 13 | 16 | 不要講了，直接現場做一個 | 10 | `#/presenter/16/0` |
| 14 | 17 | Live Session · AI Production Room | 1 | `#/presenter/17/0` |
| 15 | 18 | 剪輯 → READY → 首映 | 9 | `#/presenter/18/0` |
| 16 | 19 | 首映後：效果與路徑 | 11 | `#/presenter/19/0` |
| 17 | 20 | Green callback：另外一條路 | 12 | `#/presenter/20/0` |
| 18 | 21 | 黑貓、白貓、AI 貓 | 14 | `#/presenter/21/0` |

第一欄是播放順序，第二欄是 scene 編號 —— 兩者刻意不一致：

- **Scene 14 排在 Scene 12 前面。** AI 先說 DONE，驗收之後才發現不對，
  Scene 12「怎麼跟它說改」是這件事的下一步，不是上一步。
- **Scene 15 不在 deck 裡。** 檔案還在 `src/scenes/Scene15.tsx`，
  但它的 💡想 → 💬說 → ⚙️做 → 👀看 → 🔁改 與 Scene 08 重複，Scene 08 已經完整
  負責方法論，所以不再 recap。

Scene 07、13、15 沒有排進 deck，編號刻意不補，也不重新編號既有 scene。

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

### Scene 14–21（後半段：驗收 → 現場共創 → 結尾）

| Scene | 內容 |
| --- | --- |
| 14 | AI 回報 `DONE ✓`，人類逐項驗收後爆出問題，收在「完成 ≠ 正確／驗收才是最後一步」 |
| 12 | 承接 14：發現不對之後，怎麼跟 AI 說改 —— 可以罵，但要罵得有規格 |
| 16 | 「那我們現在不要講了」→「我們直接現場做一個」→「是你們決定內容」→ LIVE SESSION + 投稿入口 |
| 17 | 投稿（全部都要用）→ LOCK → 選風格（複選）→ AI Director（一個都不能漏）→ Story → Shot Plan → Generating i/N |
| 18 | 剪輯中（故事／分鏡／拍攝／剪輯進度）→ READY FOR PREMIERE →「這支影片在今天分享開始之前，不存在」→ 首映 → 播放成片 |
| 19 | 首映後反思：神作或災難都證明同一件事，收在「這些全部都是路徑」 |
| 20 | Green callback：手掌翻過來不一定要轉手腕，AI 給的是「多了一個選擇」 |
| 21 | 黑貓、白貓、AI 貓 → 會抓老鼠就是好貓 → 你到底要抓哪一隻老鼠 → 謝謝大家 |

素材：Scene 17 使用 `DROPTHEBEE.png`，Scene 21 結尾使用 `09.png`。

Scene 17 是唯一由畫面互動（而非按鍵 beat）推進的場次，因此只有 1 個 beat：
LOCK、風格選擇、開始寫腳本都是點擊操作，畫面內容一律由 `FilmState.phase` 決定。
Scene 18 前半段（剪輯中）同樣讀 `phase`，beat 1 之後才換成首映敘事，
所以沒有跑 Live Session 也走得完整套流程。

## 目錄

```
src/
  app/         路由、鍵盤控制、App shell
  components/  Stage、Backdrop、Reveal、PresenterChrome
  film/        Scene 17 / 18 的 FilmState 與 FilmSessionClient（本輪為 mock）
  scenes/      每個 scene 一個檔案，index.ts 是 deck 順序
  styles/      global / stage / scenes / scenes1418（Scene 14–21 共用）
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
Scene 16 的投稿 QR 同理：本輪畫的是版位（三個定位點 + 模組底），
真正的投稿連結出來之後直接換成一張 `<img>` 即可。

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
