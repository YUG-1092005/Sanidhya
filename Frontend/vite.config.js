// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// export default defineConfig({
//   plugins: [
//     react(),
//     nodePolyfills({ protocolImports: true }), // Use the default import
//   ],
//   resolve: {
//     alias: {
//       'util': path.resolve(__dirname, 'src/util.js'),
//       'events': path.resolve(__dirname, 'src/empty-module.js'),
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
