import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/PDF_REARRANGE/',
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-lib': ['pdf-lib'],
          'lucide': ['lucide-react'],
          'react-vendor': ['react', 'react-dom'],
          'radix': ['@radix-ui/react-slot', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})

