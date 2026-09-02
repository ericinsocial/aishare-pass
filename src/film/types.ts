/**
 * FilmState — the single source of truth for the AI Production Room (Scene17)
 * and the Premiere (Scene18).
 *
 * This shape is deliberately written as if it were already produced by a
 * server: it is a plain, serialisable snapshot with a monotonic `revision`.
 * The UI never mutates it and never derives progress from local timers — it
 * only renders the latest snapshot and sends commands.
 *
 * Swapping the mock for a real Live Session therefore means implementing
 * `FilmSessionClient` against a socket/HTTP backend. No UI rewrite.
 */

export type StyleId =
  | 'absurd_comedy'
  | 'hot_blooded_action'
  | 'neon_cyberpunk'
  | 'retro_hk'
  | 'horror_thriller'
  | 'romance'
  | 'animation'
  | 'mockumentary'
  | 'fantasy_epic'
  | 'surreal'

export interface FilmStyle {
  id: StyleId
  emoji: string
  label: string
  /** Short hint shown on the host's style card. */
  hint: string
}

/**
 * The ten phases the room walks through. The order here is the order of the
 * live run-of-show; `PHASE_ORDER` below is what the progress rail renders.
 */
export type FilmPhase =
  /** 1. Audience submissions are open. */
  | 'collecting'
  /** 2. LOCK — submissions frozen, host picks the style(s). */
  | 'locked'
  /** 4/5. AI Director is reading the locked elements. */
  | 'directing'
  /** 6. Story (logline + beats) is on screen. */
  | 'story'
  /** 7. Shot plan is on screen. */
  | 'shot_plan'
  /** 8. generating shot i/N ... */
  | 'generating'
  /** 9. assembling */
  | 'assembling'
  /** 10. ready */
  | 'ready'

export const PHASE_ORDER: FilmPhase[] = [
  'collecting',
  'locked',
  'directing',
  'story',
  'shot_plan',
  'generating',
  'assembling',
  'ready',
]

export interface Submission {
  id: string
  /** 投稿者 */
  author: string
  /** 投稿元素 */
  element: string
  /** Server clock, ms since epoch. */
  receivedAt: number
}

export interface StoryBeat {
  id: string
  /** ACT I / ACT II ... */
  act: string
  text: string
  /** Submission ids this beat consumes — drives the Scene18 cast list. */
  uses: string[]
}

export interface Story {
  title: string
  logline: string
  beats: StoryBeat[]
}

export type ShotStatus = 'pending' | 'generating' | 'done'

/**
 * What a single shot actually specifies, beyond one line of prompt.
 *
 * Optional on the wire: a shot is still a valid shot with a prompt alone, and
 * the production room renders whichever of these fields it is given. Nothing
 * here is required for the pipeline to run — it is what the room shows on a
 * shot card so the audience can see a shot is a spec, not a wish.
 */
export interface ShotDetails {
  /** 誰在畫面裡 */
  who: string
  /** 做什麼 */
  action: string
  /** 場景 */
  setting: string
  /** 承接上一鏡 — what this shot picks up from the one before it. */
  continuity: string
  /** 攝影機 */
  camera: string
  /** 台詞／旁白 */
  line: string
  /** 環境聲音 */
  sound: string
}

export interface Shot {
  id: string
  /** 1-based, matches "generating shot 3/8". */
  index: number
  slug: string
  prompt: string
  durationSec: number
  status: ShotStatus
  details?: ShotDetails
}

export interface DirectorState {
  /** Rolling console lines: "reading element 3/8 — 阿凱 / 一隻會計程車的鴿子". */
  log: string[]
  elementsRead: number
  totalElements: number
}

export interface AssemblyState {
  /** 0..1 */
  progress: number
  step: string
}

export interface FinalFilm {
  /** null in mock mode — Scene18 renders the empty 16:9 player frame. */
  videoUrl: string | null
  posterUrl: string | null
  durationSec: number
  /** Credits are rendered from the same state that produced the film. */
  renderedAt: number
}

export interface FilmState {
  /** Monotonic, server-authoritative in the real implementation. */
  revision: number
  /** True while this state comes from the mock client. */
  mock: boolean
  sessionCode: string
  phase: FilmPhase
  submissionsOpen: boolean
  submissions: Submission[]
  /** Host's multi-select. At least one is required to start scripting. */
  styles: StyleId[]
  director: DirectorState
  story: Story | null
  shots: Shot[]
  /** 1-based index of the shot currently rendering, 0 when none. */
  currentShot: number
  assembly: AssemblyState | null
  film: FinalFilm | null
}

/** The production credits Scene18 rolls, derived from FilmState alone. */
export interface CastCredit {
  author: string
  element: string
}

export interface ProductionCredit {
  role: string
  value: string
}

/**
 * Runtime credits for the *future* real pipeline. Nothing here is called in
 * this build — these are the names that will appear once the Live Session is
 * wired to a real backend.
 */
export const AI_PRODUCTION_CREDITS: ProductionCredit[] = [
  { role: 'AI Director', value: 'Gemini 2.5 Flash' },
  { role: 'Model Routing', value: 'OpenRouter Router' },
  { role: 'Video Generation', value: 'LTX 2.3' },
  { role: 'AI Platform', value: 'fal.ai' },
  { role: 'Video Assembly', value: 'fal.ai FFmpeg API' },
]

export const FILM_STYLES: FilmStyle[] = [
  { id: 'absurd_comedy', emoji: '😂', label: '荒謬喜劇', hint: '越離譜越好' },
  { id: 'hot_blooded_action', emoji: '🔥', label: '熱血動作', hint: '慢動作 + 爆炸' },
  { id: 'neon_cyberpunk', emoji: '🌃', label: '霓虹賽博龐克', hint: '雨夜霓虹' },
  { id: 'retro_hk', emoji: '🎞️', label: '復古港片', hint: '90s 膠卷顆粒' },
  { id: 'horror_thriller', emoji: '👻', label: '恐怖驚悚', hint: '手電筒與雜訊' },
  { id: 'romance', emoji: '💕', label: '浪漫愛情', hint: '逆光與慢鏡' },
  { id: 'animation', emoji: '🎨', label: '動畫卡通', hint: '手繪賽璐璐' },
  { id: 'mockumentary', emoji: '📹', label: '假紀錄片', hint: '對鏡頭訪談' },
  { id: 'fantasy_epic', emoji: '✨', label: '奇幻史詩', hint: '空拍與聖光' },
  { id: 'surreal', emoji: '🤯', label: '超現實', hint: '物理法則放假' },
]

export const STYLE_BY_ID: Record<StyleId, FilmStyle> = Object.fromEntries(
  FILM_STYLES.map((s) => [s.id, s]),
) as Record<StyleId, FilmStyle>
