import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById( 'canvas');

// 1. Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF0F0F0);

//2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 5;

// 4. Objects
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

const BoxGeometry = new THREE.BoxGeometry( 2, 0.1, 2);
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });
const box = new THREE.Mesh(BoxGeometry, boxMaterial);
box.position.y = -1.5;
scene.add(box);

//4. Light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 6. orbit
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 7. Animation
function animate() {
    requestAnimationFrame(animate);

    dodecahedron.rotation.x += 0.005;
    dodecahedron.rotation.y += 0.005;

    box.rotation.y += 0.005;
    box.rotation.x += 0;


    controls.update();

    renderer.render(scene, camera);
}

// 8. Window Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();