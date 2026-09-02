import type { FilmSessionClient, Unsubscribe } from './client'
import {
  STYLE_BY_ID,
  type FilmState,
  type Shot,
  type ShotDetails,
  type Story,
  type StyleId,
  type Submission,
} from './types'

/** Seeded submissions — already on the wall when Scene17 opens. */
const SEED_SUBMISSIONS: Array<[string, string]> = [
  ['阿凱', '一隻會開計程車的鴿子'],
  ['小魚', '永遠找不到的 AirPods 右耳'],
  ['Vivian', '會講幹話的自動販賣機'],
  ['老王', '凌晨三點的鹹酥雞攤'],
]

/** Trickle in during the live "submissions open" window. */
const INCOMING_SUBMISSIONS: Array<[string, string]> = [
  ['Ken', '加班到發光的工程師'],
  ['芝芝', '一杯自己會逃跑的珍奶'],
  ['Nina', '用注音輸入法的外星人'],
  ['大雄', '只到 4.5 樓的壞電梯'],
]

const SUBMISSION_INTERVAL_MS = 2600
const READ_ELEMENT_MS = 420
const STORY_MS = 1100
const SHOT_PLAN_MS = 1200
const SHOT_MS = 1500
const ASSEMBLY_TICK_MS = 260
const ASSEMBLY_TICKS = 14

/** Every shot is the same length, so N shots is a runtime you can say out loud. */
const SHOT_DURATION_SEC = 10

let seq = 0
const nextId = (prefix: string) => `${prefix}_${(seq += 1).toString(36)}`

function initialState(): FilmState {
  const now = Date.now()
  return {
    revision: 0,
    mock: true,
    sessionCode: 'DROP-THE-BEE',
    phase: 'collecting',
    submissionsOpen: true,
    submissions: SEED_SUBMISSIONS.map(([author, element], i) => ({
      id: nextId('sub'),
      author,
      element,
      receivedAt: now - (SEED_SUBMISSIONS.length - i) * 9000,
    })),
    styles: [],
    director: { log: [], elementsRead: 0, totalElements: 0 },
    story: null,
    shots: [],
    currentShot: 0,
    assembly: null,
    film: null,
  }
}

function buildStory(submissions: Submission[], styles: StyleId[]): Story {
  const styleLabels = styles.map((s) => STYLE_BY_ID[s].label)
  const pick = (i: number) => submissions[i % submissions.length]
  const a = pick(0)
  const b = pick(1)
  const c = pick(2)
  return {
    title: '《今晚，全部都是你們的錯》',
    logline: `${a.element}在城市邊緣撿到了${b.element}，於是一場沒有人負責的冒險開始了。以「${styleLabels.join(' × ')}」的方式收場。`,
    beats: [
      {
        id: nextId('beat'),
        act: 'ACT I',
        text: `世界看起來很正常，直到${a.element}出現。`,
        uses: [a.id],
      },
      {
        id: nextId('beat'),
        act: 'ACT II',
        text: `${b.element}被捲進來，事情從「有點怪」升級成「完全失控」。`,
        uses: [b.id],
      },
      {
        id: nextId('beat'),
        act: 'ACT III',
        text: `${c.element}做出了全片唯一正確的決定，然後大家假裝什麼都沒發生。`,
        uses: [c.id],
      },
    ],
  }
}

/**
 * The shot plan.
 *
 * Every locked element gets its own shot: the promise on stage is that the
 * film uses *all* of them, so the plan has to visibly account for all of them.
 * The bookends (OPEN / CHAOS / RESOLVE) are what make those element shots read
 * as one continuous story rather than a pile of unrelated clips, which is why
 * every shot carries an explicit `continuity` line.
 */
function buildShots(story: Story, submissions: Submission[], styles: StyleId[]): Shot[] {
  const styleLabel = styles.map((s) => STYLE_BY_ID[s].label).join(' × ')
  const settings = ['清晨的街口', '騎樓底下', '燈還沒關的辦公室', '巷子裡的鐵梯', '便利商店門口']
  const cameras = [
    '中景，手持，微微跟著呼吸晃',
    '特寫，固定機位',
    '過肩，慢慢推近',
    '低角度仰拍，廣角',
    '橫移，跟著走',
  ]
  const sounds = ['街上的車流與腳步', '冷氣壓縮機的低頻', '雨打在鐵皮上', '遠處的廣播聲', '室內的日光燈嗡嗡聲']

  const specs: Array<{ slug: string; prompt: string; details: ShotDetails }> = [
    {
      slug: 'OPEN',
      prompt: `空景，城市在呼吸。${styleLabel}的光先進來。`,
      details: {
        who: '（空景，人還沒進來）',
        action: '把這個世界的第一口氣交代完',
        setting: '天剛亮的城市邊緣',
        continuity: '全片第一顆 — 這一鏡的光決定後面每一鏡的光',
        camera: '大遠景，緩慢推軌',
        line: '旁白：「這一天，本來是正常的。」',
        sound: '遠處車聲、鐵捲門、一兩聲鳥叫',
      },
    },
    ...submissions.map((s, i) => {
      const prev = i === 0 ? null : submissions[i - 1]
      return {
        slug: `EL_${String(i + 1).padStart(2, '0')}`,
        prompt: `${s.element}正式進場，做出只有它會做的事。`,
        details: {
          who: s.element,
          action: `第一次讓人看清楚${s.element}到底是什麼`,
          setting: settings[i % settings.length],
          continuity: prev
            ? `鏡頭還沒離開${prev.element}，${s.element}就從畫面邊緣進來`
            : '接上一鏡的空景，第一個東西走進這個世界',
          camera: cameras[i % cameras.length],
          line:
            i % 2 === 0
              ? '沒有台詞，只有動作'
              : '旁白：「到這裡為止，都還可以解釋。」',
          sound: sounds[i % sounds.length],
        },
      }
    }),
    {
      slug: 'CHAOS',
      prompt: '所有元素同時出現在同一個畫面，鏡頭來不及跟。',
      details: {
        who: `全部 ${submissions.length} 個元素同框`,
        action: '各做各的事，然後互相撞在一起',
        setting: '前面出現過的地點被擠進同一條街',
        continuity: `承接前 ${submissions.length} 顆，每一個東西都必須認得出來`,
        camera: '廣角橫搖，跟不上，刻意失焦一次',
        line: story.beats[1]?.text ?? '中段轉折。',
        sound: '所有環境音疊在一起，然後突然全部消失',
      },
    },
    {
      slug: 'RESOLVE',
      prompt: story.beats[2]?.text ?? '收尾。',
      details: {
        who: submissions[submissions.length - 1]?.element ?? '最後一個元素',
        action: '做出全片唯一一個正確的決定',
        setting: '第一顆鏡頭的同一個地方，光已經變了',
        continuity: '回到 OPEN 的機位，讓觀眾知道這是同一個故事',
        camera: '大遠景，機位與 OPEN 完全相同',
        line: '旁白：「然後大家假裝什麼都沒發生。」',
        sound: '只剩下風，和一個沒關好的門',
      },
    },
  ]

  return specs.map((spec, i) => ({
    id: nextId('shot'),
    index: i + 1,
    slug: spec.slug,
    prompt: spec.prompt,
    durationSec: SHOT_DURATION_SEC,
    status: 'pending' as const,
    details: spec.details,
  }))
}

/**
 * In-memory stand-in for the Live Session backend.
 *
 * It owns the same state machine a server would own: the UI can only move the
 * production forward by sending commands, and every visible change arrives as
 * a new snapshot. Replacing this class with a networked one is a drop-in.
 */
export class MockFilmSessionClient implements FilmSessionClient {
  private state: FilmState = initialState()
  private listeners = new Set<() => void>()
  private timers: ReturnType<typeof setTimeout>[] = []
  private incomingQueue = [...INCOMING_SUBMISSIONS]

  constructor() {
    this.scheduleIncomingSubmission()
  }

  getSnapshot(): FilmState {
    return this.state
  }

  subscribe(listener: () => void): Unsubscribe {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  async submitElement(input: { author: string; element: string }): Promise<void> {
    const author = input.author.trim() || '匿名觀眾'
    const element = input.element.trim()
    if (!element) throw new Error('投稿元素不可為空')
    if (!this.state.submissionsOpen) throw new Error('投稿已 LOCK')
    this.patch({
      submissions: [
        ...this.state.submissions,
        { id: nextId('sub'), author, element, receivedAt: Date.now() },
      ],
    })
  }

  async lockSubmissions(): Promise<void> {
    if (this.state.phase !== 'collecting') return
    this.patch({ phase: 'locked', submissionsOpen: false })
  }

  async unlockSubmissions(): Promise<void> {
    if (this.state.phase !== 'locked') return
    this.patch({ phase: 'collecting', submissionsOpen: true })
    this.scheduleIncomingSubmission()
  }

  async toggleStyle(style: StyleId): Promise<void> {
    if (this.state.phase !== 'locked') return
    const styles = this.state.styles.includes(style)
      ? this.state.styles.filter((s) => s !== style)
      : [...this.state.styles, style]
    this.patch({ styles })
  }

  async startScripting(): Promise<void> {
    if (this.state.phase !== 'locked') return
    // Mirrors the server-side guard: at least one style is required.
    if (this.state.styles.length === 0) throw new Error('至少選擇一種影片風格')

    const submissions = this.state.submissions
    this.patch({
      phase: 'directing',
      director: { log: [], elementsRead: 0, totalElements: submissions.length },
    })
    this.readElement(0)
  }

  async resetSession(): Promise<void> {
    this.clearTimers()
    this.incomingQueue = [...INCOMING_SUBMISSIONS]
    this.state = { ...initialState(), revision: this.state.revision + 1 }
    this.emit()
    this.scheduleIncomingSubmission()
  }

  dispose(): void {
    this.clearTimers()
    this.listeners.clear()
  }

  // ---- internals -------------------------------------------------------

  private patch(patch: Partial<FilmState>) {
    this.state = { ...this.state, ...patch, revision: this.state.revision + 1 }
    this.emit()
  }

  private emit() {
    this.listeners.forEach((l) => l())
  }

  private later(fn: () => void, ms: number) {
    this.timers.push(setTimeout(fn, ms))
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout)
    this.timers = []
  }

  private scheduleIncomingSubmission() {
    if (this.incomingQueue.length === 0) return
    this.later(() => {
      if (!this.state.submissionsOpen) return
      const next = this.incomingQueue.shift()
      if (!next) return
      this.patch({
        submissions: [
          ...this.state.submissions,
          { id: nextId('sub'), author: next[0], element: next[1], receivedAt: Date.now() },
        ],
      })
      this.scheduleIncomingSubmission()
    }, SUBMISSION_INTERVAL_MS)
  }

  private readElement(i: number) {
    const submissions = this.state.submissions
    if (i >= submissions.length) {
      // The promise made on stage: every element goes in, none get dropped.
      this.patch({
        director: {
          ...this.state.director,
          log: [
            ...this.state.director.log,
            `all ${submissions.length} elements read — 0 dropped ✓`,
          ],
        },
      })
      this.later(() => this.produceStory(), STORY_MS)
      return
    }
    const s = submissions[i]
    this.later(() => {
      this.patch({
        director: {
          totalElements: submissions.length,
          elementsRead: i + 1,
          log: [
            ...this.state.director.log,
            `reading element ${i + 1}/${submissions.length} — ${s.author} / ${s.element}`,
          ],
        },
      })
      this.readElement(i + 1)
    }, READ_ELEMENT_MS)
  }

  private produceStory() {
    const story = buildStory(this.state.submissions, this.state.styles)
    this.patch({
      phase: 'story',
      story,
      director: {
        ...this.state.director,
        log: [...this.state.director.log, 'story locked ✓'],
      },
    })
    this.later(() => this.produceShotPlan(story), SHOT_PLAN_MS)
  }

  private produceShotPlan(story: Story) {
    const shots = buildShots(story, this.state.submissions, this.state.styles)
    this.patch({
      phase: 'shot_plan',
      shots,
      director: {
        ...this.state.director,
        log: [...this.state.director.log, `shot plan: ${shots.length} shots ✓`],
      },
    })
    this.later(() => {
      this.patch({ phase: 'generating' })
      this.generateShot(0)
    }, SHOT_PLAN_MS)
  }

  private generateShot(i: number) {
    const shots = this.state.shots
    if (i >= shots.length) {
      this.startAssembly()
      return
    }
    this.patch({
      currentShot: i + 1,
      shots: shots.map((s, idx) => (idx === i ? { ...s, status: 'generating' } : s)),
    })
    this.later(() => {
      this.patch({
        shots: this.state.shots.map((s, idx) => (idx === i ? { ...s, status: 'done' } : s)),
      })
      this.generateShot(i + 1)
    }, SHOT_MS)
  }

  private startAssembly() {
    this.patch({
      phase: 'assembling',
      currentShot: 0,
      assembly: { progress: 0, step: '接上每一顆鏡頭' },
    })
    this.assemblyTick(1)
  }

  private assemblyTick(tick: number) {
    if (tick > ASSEMBLY_TICKS) {
      const total = this.state.shots.reduce((sum, s) => sum + s.durationSec, 0)
      this.patch({
        phase: 'ready',
        assembly: { progress: 1, step: '完成' },
        film: {
          videoUrl: null, // mock run — Scene18 renders the empty 16:9 frame
          posterUrl: null,
          durationSec: total,
          renderedAt: Date.now(),
        },
      })
      return
    }
    const steps = ['接上每一顆鏡頭', '轉場與節奏', '調光統一色溫', '疊上聲音', '輸出成一支完整影片']
    this.later(() => {
      this.patch({
        assembly: {
          progress: tick / ASSEMBLY_TICKS,
          step: steps[Math.min(steps.length - 1, Math.floor((tick / ASSEMBLY_TICKS) * steps.length))],
        },
      })
      this.assemblyTick(tick + 1)
    }, ASSEMBLY_TICK_MS)
  }
}
