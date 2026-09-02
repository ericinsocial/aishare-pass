import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { FilmProvider } from './film/FilmProvider'
import './styles/global.css'
import './styles/stage.css'
import './styles/scenes.css'
import './styles/scenes1418.css'
import './styles/scenes0912.css'

// FilmProvider sits above the deck so Scene 17 (the production room) and
// Scene 18 (the premiere) read the same live-session snapshot as the
// presenter steps between them.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilmProvider>
      <App />
    </FilmProvider>
  </StrictMode>,
)
