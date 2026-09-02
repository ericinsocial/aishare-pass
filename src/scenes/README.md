# Scenes 05 / 06 / 08

Presentation-only React components for three slides of the AI share deck.

## What lives here

| File | Slide | Artwork | Beats |
| --- | --- | --- | --- |
| `Scene05.tsx` | Prompt 五大元素 | `05.png` | 8 |
| `Scene06.tsx` | Conversation | `06.png` | 8 |
| `Scene08.tsx` | IDEA → REALITY | `08.png` | 7 |

Scene 07 does not exist in the final registry, and no placeholder is created
here to fill the gap in the numbering.

## Contract with the presenter

Each scene is a pure function of its `beat` prop:

```tsx
import { Scene05, scene05Beats } from './scenes';

<Scene05 beat={beat} />   // beat: 0 … scene05Beats - 1
```

* The **presenter owns navigation.** Scenes contain no key handlers, no
  routing, no state, and no timers — advancing and rewinding is entirely the
  left/right arrow keys the presenter shell listens to.
* **No autoplay.** Nothing in this folder advances a beat on its own. The
  transitions are plain CSS transitions that fire when `beat` changes, so
  stepping backwards animates back out.
* Out-of-range `beat` values are clamped inside the scene, so the presenter
  does not have to be careful about bounds.
* `imageSrc` is an optional prop. It defaults to `/05.png`, `/06.png`,
  `/08.png` — the original artwork files, served from the deck's static root.
  Nothing here regenerates or re-encodes an image; pass `imageSrc` if the deck
  serves them from a different path or through a bundler import.

## Beat maps

**Scene05** — the five elements are a checklist, not a formula, so they enter
one at a time:
`0` headline · `1` the "checklist, not formula" reframe · `2–6` 角色 / 任務 /
脈絡 / 限制 / 格式, one per beat · `7` the close.

**Scene06** — `0` 不是不用 Prompt · `1` 是不需要把每句話都寫得像 Prompt ·
`2–6` the conversation grows one turn at a time (開場 → 回覆 → 修正 → 回覆 →
補充) · `7` 真正的 Prompt，可以是一整段 conversation.

**Scene08** — `0` IDEA → REALITY · `1–5` 想 / 說 / 做 / 看 / 改, one step per
beat, with the return arrow from 改 back to 說 appearing on the last step ·
`6` 只要有想法，就試著把它實現.

## Styling

Inline styles with tokens from `sceneStyles.ts`, so the scenes drop into any
shell without assuming a CSS pipeline, and `SceneFrame.tsx` is a small local
presentational shell (artwork + scrim + content slot) shared by the three.
