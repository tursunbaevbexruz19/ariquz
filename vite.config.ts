import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  server: { port: Number(process.env.PORT) || 5173, strictPort: false },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    // The animation libraries change far less often than the page does.
    // Splitting them out lets a returning visitor reuse the cached copy
    // after a copy edit, instead of refetching the whole bundle.
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'motion', test: /[\\/]node_modules[\\/](gsap|lenis|motion)[\\/]/ },
          ],
        },
      },
    },
  },
})
