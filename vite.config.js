import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000, // Use PORT from environment variable or default to 3000
    host: true,
    historyApiFallback: true,// Allow access from Render's environment
  },
})
