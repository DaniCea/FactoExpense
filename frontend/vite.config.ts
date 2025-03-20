/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    https: {
      key: fs.readFileSync(path.resolve('/app/config', 'ssl', 'server.key')),
      cert: fs.readFileSync(path.resolve('/app/config', 'ssl', 'server.crt')),
    }
  }
})
