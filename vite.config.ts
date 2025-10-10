import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import packageJSON from './package.json'

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
            return generateChunkName('vendor1')
          }
          // Not much critical in index page.
          const packages = ['react-markdown', 'mdast-util-from-markdown', 'unist-util-visit']
          if (id.includes('node_modules') && packages.some(name => id.includes(name))) {
            return generateChunkName('vendor2')
          }
          // It's too big so chunk it in a standalone package.
          if (id.includes('react-syntax-highlighter')) {
            return generateChunkName('syntax-highlighter')
          }
          if (id.includes('src/contexts') || id.includes('src/utils')) {
            return generateChunkName('shared')
          }
        },
      }
    }
  }
})

function generateChunkName(name: string) {
  return `${name}-${packageJSON.version}`
}
