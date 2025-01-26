import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api/users': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/posts': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/notifications': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
});