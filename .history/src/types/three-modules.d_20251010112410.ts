// This file provides type declarations for Three.js modules
declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
    export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
}

declare module 'three/examples/jsm/loaders/DRACOLoader.js' {
    export { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
}

declare module '*.glb' {
    const content: string;
    export default content;
}