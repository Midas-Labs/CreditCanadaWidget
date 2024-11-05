/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENV: 'local' | 'dev' | 'staging' | 'prod';
    readonly VITE_API_URL?: string;
    readonly VITE_ROOT_DOMAIN: string;
    readonly VITE_GOOGLE_ANALYTICS?: string;
    readonly VITE_SHAKEBUGS_API_KEY?: string;
    readonly VITE_SHAKEBUGS_URL?: string;
    readonly VITE_SEGMENT_WRITE_KEY?: string;
    readonly VITE_FEEDBACK_ENV: 'local' | 'dev' | 'staging' | 'prod';
    readonly VITE_WORSHIP_SECRET_KEY: string;
    // Add other variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  