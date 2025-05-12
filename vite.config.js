import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // Escucha en 0.0.0.0 (todas las interfaces)
    port: 5173      // O el puerto que prefieras
  }
})
