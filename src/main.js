import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);
scene.fog = new THREE.Fog(0x0a0a0f, 20, 60);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 4, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting
const sun = new THREE.DirectionalLight(0xfff4e0, 2);
sun.position.set(5, 10, 5);
sun.castShadow = true;
scene.add(sun);
scene.add(new THREE.AmbientLight(0x334466, 1.5));

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Blob placeholder — spinning icosahedron, Phase 1 stand-in
const blobGeo = new THREE.IcosahedronGeometry(1, 2);
const blobMat = new THREE.MeshStandardMaterial({
  color: 0x6644ff,
  roughness: 0.3,
  metalness: 0.1,
  emissive: 0x221133,
});
const blob = new THREE.Mesh(blobGeo, blobMat);
blob.position.y = 1;
blob.castShadow = true;
scene.add(blob);

// A few scattered objects to hint at the game
const colors = [0xff4466, 0x44ffaa, 0xffcc22, 0x22aaff];
for (let i = 0; i < 12; i++) {
  const size = 0.15 + Math.random() * 0.35;
  const geo = Math.random() > 0.5
    ? new THREE.BoxGeometry(size, size, size)
    : new THREE.SphereGeometry(size * 0.6, 8, 8);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.6 })
  );
  const angle = (i / 12) * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  mesh.position.set(Math.cos(angle) * radius, size / 2, Math.sin(angle) * radius);
  mesh.castShadow = true;
  scene.add(mesh);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let t = 0;
function animate() {
  t += 0.01;
  blob.rotation.y = t;
  blob.rotation.x = t * 0.4;
  blob.position.y = 1 + Math.sin(t * 1.5) * 0.15;
  camera.position.x = Math.sin(t * 0.2) * 0.5;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
