import type { Scene } from '../types/scene'
import { Scene01Strawberry, SCENE_01_BEATS } from './Scene01Strawberry'
import { Scene02Timeline, SCENE_02_BEATS } from './Scene02Timeline'
import { Scene03Failure, SCENE_03_BEATS } from './Scene03Failure'
import { Scene04PromptArchaeology, SCENE_04_BEATS } from './Scene04PromptArchaeology'
import { Scene09, SCENE_09_BEATS } from './Scene09'
import { Scene10, SCENE_10_BEATS } from './Scene10'
import { Scene11, SCENE_11_BEATS } from './Scene11'
import { Scene12, SCENE_12_BEATS } from './Scene12'

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
  {
    slug: '12',
    title: '罵得有規格',
    beats: SCENE_12_BEATS,
    view: Scene12,
  },
]

/**
 * Scenes 05 / 06 / 08 already live in this folder but are not part of the deck
 * order above yet. Their barrel exports are kept intact so the presenter shell
 * can register them when the deck is extended.
 */
export { default as Scene05, beats as scene05Beats } from './Scene05';
export { default as Scene06, beats as scene06Beats } from './Scene06';
export { default as Scene08, beats as scene08Beats } from './Scene08';
export type { SceneProps, SceneModule } from './types';
