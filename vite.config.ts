import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // Slide artwork is intentionally large; don't warn about it.
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
  },
})
