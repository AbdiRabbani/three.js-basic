import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const pov = 45;
const aspect = w / h;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(pov, aspect, near, far);

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(10, 15, -22)

orbit.update();

const geo = new THREE.PlaneGeometry(20, 20);

const mat = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide
})

const planMesh = new THREE.Mesh(geo, mat);
planMesh.rotateX(-Math.PI / 2)
scene.add(planMesh);

const grid = new THREE.GridHelper(20,20)
scene.add(grid);

function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animation())
