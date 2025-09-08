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
          const criticalPackages = ['/react/', 'react-dom', 'react-router']
          if (id.includes('node_modules') && criticalPackages.some(name => id.includes(name))) {
            return 'vendor1'
          }
          const packages = ['react-markdown', 'mdast-util-from-markdown', 'unist-util-visit']
          if (id.includes('node_modules') && packages.some(name => id.includes(name))) {
            return 'vendor2'
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
