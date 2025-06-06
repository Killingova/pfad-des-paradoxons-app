// ─── apps/web/vite.config.ts ──────────────────────────────────────────────────

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html'),
    },
  },
  server: {
    // Für Production-Build ist das hier nicht relevant,
    // Dev-Server-Konfig steht in vite.config.dev.ts oder per CLI.
    host: true,
    port: 80,
  },
})
