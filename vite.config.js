import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  build: {
    outDir: 'dist'
  }
})
