import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: "https://midas-labs.github.io/CreditCanadaWidget/",
  build: {
    lib: {
      entry: './src/main.tsx', // Path to your main file
      name: 'ChatBot', // Global name for UMD build
      fileName: 'chatbot', // Output filename
      formats: ['es', 'umd'], // ES and UMD format for compatibility
    },
    rollupOptions: {
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
