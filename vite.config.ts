import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps every emitted asset URL relative, so the built site can be
// dropped onto GitHub Pages (project sub-path) without any further config.
// Routing is hash-based for the same reason: no server rewrite rules needed.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Source images live at the repo root and one of them has a space in
        // its filename; sanitise it so every emitted URL is space-free.
        assetFileNames: (asset) => {
          const name = (asset.names?.[0] ?? asset.name ?? 'asset').replace(/\s+/g, '-')
          const dot = name.lastIndexOf('.')
          const stem = dot > 0 ? name.slice(0, dot) : name
          const ext = dot > 0 ? name.slice(dot) : ''
          return `assets/${stem}-[hash]${ext}`
        },
      },
    },
  },
})
