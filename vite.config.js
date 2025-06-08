import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/technologie-webowe/', // needed for GitHub Pages!
    build: {
        outDir: 'dist',
    },
    plugins: [
        tailwindcss(),
    ],
})
