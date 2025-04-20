import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/tests/setup.ts',
        'src/app/layout.tsx',
      ],
    },
    setupFiles: ['./src/tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: path.resolve(__dirname, 'src/assets'),
      entities: path.resolve(__dirname, 'src/entities'),
      features: path.resolve(__dirname, 'src/features'),
      processes: path.resolve(__dirname, 'src/processes'),
      shared: path.resolve(__dirname, 'src/shared'),
      wigets: path.resolve(__dirname, 'src/wigets'),
      app: path.resolve(__dirname, 'src/app'),
      'monaco-editor': path.resolve(
        __dirname,
        'src/tests/moks/monaco-editor.ts'
      ),
    },
  },
});
