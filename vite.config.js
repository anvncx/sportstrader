import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        howItWorks: resolve(root, 'how-it-works.html'),
        faq: resolve(root, 'faq.html'),
        rules: resolve(root, 'rules.html'),
        dashboard: resolve(root, 'dashboard.html')
      }
    }
  }
});
