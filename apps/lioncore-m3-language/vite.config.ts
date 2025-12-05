import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss(),
        {
            name: 'reload',
            configureServer(server) {
                const {
                    ws,
                    watcher
                } = server;
                watcher.on('change', file => {
                    if (file.endsWith('.css')) {
                        ws.send({
                            type: 'full-reload',
                        });
                    }
                });
            },
        },
    ]
})
