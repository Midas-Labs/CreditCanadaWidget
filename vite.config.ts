import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  // base: 'https://midas-labs.github.io/CreditCanadaWidget/', // new
  base: '/CreditCanadaWidget', 
    build: {
    lib: {
      entry: './src/main.tsx', 
      name: 'ChatBot',
      fileName:  'chatbot', 
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // external: ['preact'], //  new
      output: {
        globals: {
          preact: 'Preact',
        },
      },
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  }
});


// import { defineConfig } from 'vite';
// import preact from '@preact/preset-vite';

// export default defineConfig({
//   plugins: [preact()],
//   resolve: {
//     alias: {
//       react: 'preact/compat',
//       'react-dom/test-utils': 'preact/test-utils',
//       'react-dom': 'preact/compat',
//       'react/jsx-runtime': 'preact/jsx-runtime',
//     },
//   },
// });
