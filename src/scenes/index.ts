import type { Scene } from '../types/scene'
import { Scene01Strawberry, SCENE_01_BEATS } from './Scene01Strawberry'
import { Scene02Timeline, SCENE_02_BEATS } from './Scene02Timeline'
import { Scene03Failure, SCENE_03_BEATS } from './Scene03Failure'
import { Scene04PromptArchaeology, SCENE_04_BEATS } from './Scene04PromptArchaeology'
import { Scene05PromptElements, SCENE_05_BEATS } from './Scene05PromptElements'
import { Scene06Conversation, SCENE_06_BEATS } from './Scene06Conversation'
import { Scene08IdeaToReality, SCENE_08_BEATS } from './Scene08IdeaToReality'
import { Scene09, SCENE_09_BEATS } from './Scene09'
import { Scene10, SCENE_10_BEATS } from './Scene10'
import { Scene11, SCENE_11_BEATS } from './Scene11'
import { Scene12, SCENE_12_BEATS } from './Scene12'
import { Scene14, SCENE_14_BEATS } from './Scene14'
// Scene 15 is still in the folder but no longer in the deck: its 想→說→做→看→改
// recap repeats Scene 08, which already owns the method.
import { Scene16, SCENE_16_BEATS } from './Scene16'
import { Scene17, SCENE_17_BEATS } from './Scene17'
import { Scene18, SCENE_18_BEATS } from './Scene18'
import { Scene19, SCENE_19_BEATS } from './Scene19'
import { Scene20, SCENE_20_BEATS } from './Scene20'
import { Scene21, SCENE_21_BEATS } from './Scene21'

/**
 * Deck order. The slug is the URL segment: #/presenter/<slug>/<beat>
 * Adding a scene is one entry here plus one file in this folder.
 */
export const scenes: Scene[] = [
  {
    slug: '01',
    title: 'Strawberry 測試',
    beats: SCENE_01_BEATS,
    view: Scene01Strawberry,
  },
  {
    slug: '02',
    title: 'AI 能力時間線',
    beats: SCENE_02_BEATS,
    view: Scene02Timeline,
  },
  {
    slug: '03',
    title: 'AI 翻車',
    beats: SCENE_03_BEATS,
    view: Scene03Failure,
  },
  {
    slug: '04',
    title: 'Prompt Archaeology',
    beats: SCENE_04_BEATS,
    view: Scene04PromptArchaeology,
  },
  {
    slug: '05',
    title: 'Prompt 五大元素',
    beats: SCENE_05_BEATS,
    view: Scene05PromptElements,
  },
  {
    slug: '06',
    title: 'Conversation',
    beats: SCENE_06_BEATS,
    view: Scene06Conversation,
  },
  // Scene 07 is not part of the deck; the numbering is deliberately not padded.
  {
    slug: '08',
    title: 'IDEA → REALITY',
    beats: SCENE_08_BEATS,
    view: Scene08IdeaToReality,
  },
  {
    slug: '09',
    title: '主題揭露：會抓老鼠就是好貓',
    beats: SCENE_09_BEATS,
    view: Scene09,
  },
  {
    slug: '10',
    title: 'AI 工作流程',
    beats: SCENE_10_BEATS,
    view: Scene10,
  },
  {
    slug: '11',
    title: 'REAL WORK',
    beats: SCENE_11_BEATS,
    view: Scene11,
  },
  // AI reports DONE before we find out whether it is right, so Scene 14 comes
  // first and Scene 12 is the answer to what it turns up. Slugs stay put — this
  // is a running order, not a renumbering.
  {
    slug: '14',
    title: 'DONE ≠ RIGHT',
    beats: SCENE_14_BEATS,
    view: Scene14,
  },
  {
    slug: '12',
    title: '我跟 AI 實際工作的樣子',
    beats: SCENE_12_BEATS,
    view: Scene12,
  },
  // Scene 13 has no final version, and Scene 15 was dropped from the running
  // order; both files stay where they are and neither number is reused.
  {
    slug: '16',
    title: '不要講了，直接現場做一個',
    beats: SCENE_16_BEATS,
    view: Scene16,
  },
  {
    slug: '17',
    title: 'Live Session · AI Production Room',
    beats: SCENE_17_BEATS,
    view: Scene17,
  },
  {
    slug: '18',
    title: '剪輯 → READY → 首映',
    beats: SCENE_18_BEATS,
    view: Scene18,
  },
  {
    slug: '19',
    title: '首映後：效果與路徑',
    beats: SCENE_19_BEATS,
    view: Scene19,
  },
  {
    slug: '20',
    title: 'Green callback：另外一條路',
    beats: SCENE_20_BEATS,
    view: Scene20,
  },
  {
    slug: '21',
    title: '黑貓、白貓、AI 貓',
    beats: SCENE_21_BEATS,
    view: Scene21,
  },
]
