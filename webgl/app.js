'use strict';

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes');
const random = require('canvas-sketch-util/random');

const settings = {
  // Make the loop animated
  animate: true,
  attributes: {
    antialias: true
  },
  context: 'webgl',
  dimensions: [512, 512]
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  const palette = random.pick(palettes);
  renderer.setClearColor(random.pick(palette), 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.lookAt(new THREE.Vector3());

  // Setup your scene
  const scene = new THREE.Scene();

  const box = new THREE.BoxGeometry(1, 1, 1);

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(
    box,
    new THREE.MeshStandardMaterial({ color: random.pick(palette) })
  );
  mesh.position.set(0, 0, 0);
  mesh.scale.set(2, 2, 2);
  mesh.scale.multiplyScalar(random.range(0.2, 0.4));
  scene.add(mesh);

  scene.add(new THREE.AmbientLight('hsl(0, 0%, 50%)'));

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(2, 2, 4);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    render({ time }) {
      scene.rotation.y = time;
      renderer.render(scene, camera);
    },
    // Update & render your scene here
    resize({ pixelRatio, viewportHeight, viewportWidth }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;
      const zoom = 1;

      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      camera.near = -100;
      camera.far = 100;

      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      camera.updateProjectionMatrix();
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
