import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/bananer95-REACT2025Q3/',
  plugins: [react(), tailwindcss()],
});
