import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const packageNames = ['/react/', 'react-dom', 'react-markdown', 'react-router','mdast-util-from-markdown', 'unist-util-visit']
          if (id.includes('node_modules') && packageNames.some(name => id.includes(name))) {
            // return id.toString().split('node_modules/')[1].split('/')[0].toString();
            return 'vendor'
          }
          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-highlighter'
          }
          if (id.includes('src/contexts') || id.includes('src/utils')) {
            return 'shared'
          }
        },
      }
    }
  }
})
