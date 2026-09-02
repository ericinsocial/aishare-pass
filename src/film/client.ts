import type { FilmState, StyleId } from './types'

export type Unsubscribe = () => void

/**
 * The seam between the UI and the Live Session.
 *
 * Everything Scene17/Scene18 can *do* is a command; everything they can *see*
 * is a snapshot. Commands return a promise and nothing else — they never
 * return the next state, because in the real implementation the next state
 * arrives from the server over `subscribe`.
 *
 * A real client (WebSocket / SSE + REST commands) implements exactly this
 * interface and the scenes keep working unchanged.
 */
export interface FilmSessionClient {
  /** Current snapshot. Cheap, referentially stable between changes. */
  getSnapshot(): FilmState
  /** Fires on every new revision. Returns an unsubscribe function. */
  subscribe(listener: () => void): Unsubscribe

  // ---- commands (audience) ----
  submitElement(input: { author: string; element: string }): Promise<void>

  // ---- commands (host) ----
  lockSubmissions(): Promise<void>
  unlockSubmissions(): Promise<void>
  toggleStyle(style: StyleId): Promise<void>
  /** 🎬 開始寫腳本 — rejected by the server when no style is selected. */
  startScripting(): Promise<void>
  resetSession(): Promise<void>

  /** Tear down timers / sockets. */
  dispose(): void
}

/**
 * How the app obtains its client.
 *
 * Today this always returns the in-memory mock. When the Live Session backend
 * exists, this is the ONLY place that changes:
 *
 *   return new LiveFilmSessionClient(import.meta.env.VITE_FILM_SESSION_URL)
 *
 * No scene imports the mock directly.
 */
export type FilmClientMode = 'mock' | 'live'

export interface FilmClientOptions {
  mode?: FilmClientMode
}
