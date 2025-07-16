import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/bananer95-REACT2025Q3/',
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts'
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 80,
        statements: 50
      }

    },
  },
});
