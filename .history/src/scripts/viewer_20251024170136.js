import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/DRACOLoader.js';

/**
 * Initializes a Three.js viewer in a given container.
 * @param {HTMLElement} container The element to render the canvas in.
 * @param {string} modelPath The path to the GLB model to load.
 */
export function initViewer(container, modelPath) {
    if (!container || !modelPath) {
        console.error('Viewer initialization failed: container or modelPath is missing.');
        return;
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x383e42); // RAL 7016 Anthracite Grey

    // --- Camera Setup ---
    const sizes = {
        width: container.clientWidth,
        height: container.clientHeight,
    };
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(0, 0, 300); // Adjusted for a good initial view
    scene.add(camera);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // --- Model Loading ---
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let modelGroup = null;

    gltfLoader.load(
        modelPath,
        (gltf) => {
            console.log(`Model loaded successfully from ${modelPath}`);
            const loadedModel = gltf.scene;

            // --- Two-Pass Rendering Effect (Solid Fill + Green Edges) ---
            const renderGroup = new THREE.Group();
            loadedModel.traverse((child) => {
                if (child.isMesh && child.geometry) {
                    // 1. Solid grey fill (matches background)
                    const solidMaterial = new THREE.MeshBasicMaterial({
                        color: 0x383e42,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1,
                    });
                    const solidMesh = new THREE.Mesh(child.geometry, solidMaterial);
                    
                    // 2. Green edges
                    const edges = new THREE.EdgesGeometry(child.geometry, 15);
                    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x42cc5d });
                    const lineSegments = new THREE.LineSegments(edges, lineMaterial);

                    renderGroup.add(solidMesh);
                    renderGroup.add(lineSegments);
                }
            });

            // --- Centering and Scaling ---
            const box = new THREE.Box3().setFromObject(renderGroup);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            renderGroup.position.sub(center); // Center the group
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 150 / maxDim; // Scale to fit
            renderGroup.scale.setScalar(scale);

            modelGroup = renderGroup;
            scene.add(modelGroup);
        },
        (progress) => {
            console.log(`Loading model: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
        },
        (error) => {
            console.error(`Error loading model from ${modelPath}:`, error);
        }
    );

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const tick = () => {
        if (modelGroup) {
            modelGroup.rotation.y += clock.getDelta() * 0.4;
        }
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };
    tick();

    // --- Resize Handling ---
    const handleResize = () => {
        sizes.width = container.clientWidth;
        sizes.height = container.clientHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
}
