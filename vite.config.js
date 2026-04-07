import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
    // Don't copy the large loot-assets folder (2.5GB) to build output.
    // Assets are loaded at runtime from the public folder or CDN.
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      buffer: 'buffer/'
    }
  }
})
