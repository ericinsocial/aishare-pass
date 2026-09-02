# aishare

《黑貓、白貓、AI 貓：會抓老鼠就是好貓》— 16:9 舞台簡報。

## 開發

```bash
npm install
npm run dev      # 本機預覽
npm run build    # 輸出到 dist/
npm run preview  # 預覽 build 結果
```

## 操作

| 鍵 | 動作 |
| --- | --- |
| `→` / `空白鍵` / `↓` | 下一個動畫節點（到底時換下一頁） |
| `←` / `↑` / `Backspace` | 上一步 |
| `1`–`4` | 直接跳到第 1–4 頁 |
| `F` | 全螢幕 |
| `Home` | 回到開頭 |

也可以直接點畫面：左側 18% 是上一步，其餘是下一步。

## 結構

畫面固定以 1920×1080 設計，`src/components/Stage.jsx` 會等比縮放置中，
所以字級在任何投影機上都跟設計稿一致。

```
src/
  Deck.jsx              頁面／動畫節點的切換
  components/Stage.jsx  16:9 舞台縮放
  components/Rise.jsx   所有動畫共用的進場元件
  scenes/index.js       場次註冊表
  scenes/Scene09.jsx    主題揭露
  scenes/Scene10.jsx    AI 工作流程
  scenes/Scene11.jsx    REAL WORK（實際成果）
  scenes/Scene12.jsx    如何跟 AI 溝通修改
```

目前只有 Scene09–Scene12。要加其他場次時，把它加進
`src/scenes/index.js` 的 `SCENES` 陣列即可，不需要動到既有的場次檔案。

## 素材

- Scene09 使用根目錄的 `09.png` 作為主視覺。
- Scene11 會用 `import.meta.glob` 自動掃描根目錄所有 `cibar-*` 圖片並組成展示牆；
  新增圖片只要放進根目錄就會出現，標題可在 `Scene11.jsx` 的 `CAPTIONS` 補上。
- 沒有實際截圖的項目（公司網站／CRM／活動管理）一律以文字 UI card 呈現，
  並標記「文字示意」，不生成假截圖。
