import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(async () => {
  const tailwindcss = await import('tailwindcss');
  const autoprefixer = await import('autoprefixer');

  return {
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [
          tailwindcss.default,
          autoprefixer.default,
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
    },
  };
});
