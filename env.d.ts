
/**
 * Global type definitions for Nexus OS.
 * This file augments the global Window interface and NodeJS ProcessEnv.
 */

// Fix: Wrapping these augmentations in 'declare global' and adding 'export {}' 
// ensures that the declarations merge correctly with existing global types 
// and maintain identical modifiers across all instances.
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// Convert the file into a module to properly trigger global augmentation.
export {};
