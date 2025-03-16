import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    https: {
      key: fs.readFileSync(path.resolve('/app', 'ssl', 'server.key')),
      cert: fs.readFileSync(path.resolve('/app', 'ssl', 'server.crt')),
    }
  }
})
