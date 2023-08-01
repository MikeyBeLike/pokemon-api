import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './test-setup.ts',
        alias: {
            // eslint-disable-next-line unicorn/prefer-module
            '@': path.resolve(__dirname, './src')
        }
    },
})