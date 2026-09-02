import type { FilmClientOptions, FilmSessionClient } from './client'
import { MockFilmSessionClient } from './mockClient'

/**
 * The single swap point between mock and a real Live Session.
 *
 * When the backend exists, add the `live` branch here and nothing else in the
 * app has to change — every scene talks to `FilmSessionClient`, never to a
 * concrete implementation.
 */
export function createFilmSessionClient(options: FilmClientOptions = {}): FilmSessionClient {
  const mode = options.mode ?? 'mock'
  if (mode === 'live') {
    // Intentionally not implemented in this build: no backend, no API keys.
    throw new Error('live FilmSessionClient is not wired up yet — this build is mock-only')
  }
  return new MockFilmSessionClient()
}
