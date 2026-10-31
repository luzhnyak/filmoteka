import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/filmoteka/',
  // Preserve the environment variable names already used in GitHub secrets.
  envPrefix: ['VITE_', 'REACT_APP_'],
  resolve: {
    alias: ['components', 'pages', 'redux'].map(directory => ({
      find: new RegExp(`^${directory}/`),
      replacement: `${fileURLToPath(new URL(`./src/${directory}`, import.meta.url))}/`,
    })),
  },
  build: { outDir: 'build' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    clearMocks: true,
    server: { deps: { inline: ['react-loader-spinner'] } },
  },
});
