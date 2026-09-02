import type { Scene } from '../types/scene'
import { Scene01Strawberry, SCENE_01_BEATS } from './Scene01Strawberry'
import { Scene02Timeline, SCENE_02_BEATS } from './Scene02Timeline'
import { Scene03Failure, SCENE_03_BEATS } from './Scene03Failure'
import { Scene04PromptArchaeology, SCENE_04_BEATS } from './Scene04PromptArchaeology'
import { Scene14, SCENE_14_BEATS } from './Scene14'
import { Scene15, SCENE_15_BEATS } from './Scene15'
import { Scene16, SCENE_16_BEATS } from './Scene16'
import { Scene17, SCENE_17_BEATS } from './Scene17'
import { Scene18, SCENE_18_BEATS } from './Scene18'

/**
 * Deck order. The slug is the URL segment: #/presenter/<slug>/<beat>
 * Adding a scene is one entry here plus one file in this folder.
 *
 * Scene 13 has no final version, so the deck steps straight from 04 to 14.
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
    slug: '14',
    title: 'DONE ≠ RIGHT',
    beats: SCENE_14_BEATS,
    view: Scene14,
  },
  {
    slug: '15',
    title: '方法論 recap',
    beats: SCENE_15_BEATS,
    view: Scene15,
  },
  {
    slug: '16',
    title: 'Showtime 轉場',
    beats: SCENE_16_BEATS,
    view: Scene16,
  },
  {
    slug: '17',
    title: 'AI Production Room',
    beats: SCENE_17_BEATS,
    view: Scene17,
  },
  {
    slug: '18',
    title: 'Premiere',
    beats: SCENE_18_BEATS,
    view: Scene18,
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
