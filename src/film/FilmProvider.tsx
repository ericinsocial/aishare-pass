import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import type { FilmSessionClient } from './client'
import { createFilmSessionClient } from './factory'
import type { FilmState } from './types'

const ClientContext = createContext<FilmSessionClient | null>(null)

export function FilmProvider({ children }: { children: ReactNode }) {
  const [client] = useState<FilmSessionClient>(() => createFilmSessionClient())
  useEffect(() => () => client.dispose(), [client])
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}

export function useFilmClient(): FilmSessionClient {
  const client = useContext(ClientContext)
  if (!client) throw new Error('useFilmClient must be used inside <FilmProvider>')
  return client
}

/** Re-renders on every new snapshot, exactly like a server push would. */
export function useFilmState(): FilmState {
  const client = useFilmClient()
  return useSyncExternalStore(
    (cb) => client.subscribe(cb),
    () => client.getSnapshot(),
    () => client.getSnapshot(),
  )
}

/**
 * Command helper: keeps the "fire a command, wait for the snapshot" shape and
 * surfaces rejections (e.g. the no-style-selected guard) as a transient error.
 */
export function useFilmCommand() {
  const client = useFilmClient()
  const [error, setError] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  return useMemo(
    () => ({
      error,
      run: (command: (c: FilmSessionClient) => Promise<void>) => {
        setError(null)
        command(client).catch((e: unknown) => {
          setError(e instanceof Error ? e.message : String(e))
          if (timer.current) clearTimeout(timer.current)
          timer.current = setTimeout(() => setError(null), 2600)
        })
      },
    }),
    [client, error],
  )
}
