import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin',
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify('http://192.168.1.5:8080'),
  },
})
 