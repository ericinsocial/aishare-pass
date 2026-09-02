import type { Scene } from '../types/scene'
import { Scene01Strawberry, SCENE_01_BEATS } from './Scene01Strawberry'
import { Scene02Timeline, SCENE_02_BEATS } from './Scene02Timeline'
import { Scene03Failure, SCENE_03_BEATS } from './Scene03Failure'
import { Scene04PromptArchaeology, SCENE_04_BEATS } from './Scene04PromptArchaeology'
import { Scene05PromptElements, SCENE_05_BEATS } from './Scene05PromptElements'
import { Scene06Conversation, SCENE_06_BEATS } from './Scene06Conversation'
import { Scene08IdeaToReality, SCENE_08_BEATS } from './Scene08IdeaToReality'

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
]
