# AISHARE

16:9 全螢幕互動式簡報，現場投影用

## 技術

React + TypeScript + Vite，hash routing，純前端（沒有後端、沒有 AI API、沒有 Worker）

## 開發

```bash
npm install
npm run dev      # 開發
npm run build    # 產出 dist/
npm run preview  # 預覽 build 結果
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

## 目錄

```
src/
  app/         路由、鍵盤控制、App shell
  components/  Stage、Backdrop、Reveal、PresenterChrome
  scenes/      每個 scene 一個檔案，index.ts 是 deck 順序
  styles/      global / stage / scenes
  types/       Scene 與 beat 型別
```

Scene 圖片直接引用 repo 根目錄的原圖，未經修改
