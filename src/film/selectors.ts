import { STYLE_BY_ID, type CastCredit, type FilmState } from './types'

/** CAST — 「{投稿者} 飾演「{投稿元素}」」, in submission order. */
export function selectCast(state: FilmState): CastCredit[] {
  return state.submissions.map((s) => ({ author: s.author, element: s.element }))
}

/** STYLE — the host's multi-select, in the order it was picked. */
export function selectStyleLabels(state: FilmState): string[] {
  return state.styles.map((id) => `${STYLE_BY_ID[id].emoji} ${STYLE_BY_ID[id].label}`)
}

export function selectDoneShots(state: FilmState): number {
  return state.shots.filter((s) => s.status === 'done').length
}

export function selectRuntimeLabel(state: FilmState): string {
  const total = state.film?.durationSec ?? state.shots.reduce((n, s) => n + s.durationSec, 0)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
