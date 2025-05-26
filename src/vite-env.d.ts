
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare global {
  const vi: typeof import('vitest').vi;
  var vi: typeof import('vitest').vi;
  
  namespace globalThis {
    var vi: typeof import('vitest').vi;
  }
}

export {};
