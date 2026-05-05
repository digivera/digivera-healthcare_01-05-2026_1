import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/contact': {
        target: 'https://processmail.md-client.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contact/, '/api/inquiry'),
      },
    },
  },
})
