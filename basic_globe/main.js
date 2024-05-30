import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const pov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(pov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement)

const geo = new THREE.IcosahedronGeometry(1.0, 5);
const geo2 = new THREE.IcosahedronGeometry(1.1, 5);

const mat = new THREE.MeshStandardMaterial({
    color: 0xFF23A8F2,
    flatShading: true,
})

const WireMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
})

const mesh = new THREE.Mesh(geo, mat);
const WireMesh = new THREE.Mesh(geo2, WireMat);
scene.add(mesh);
scene.add(WireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight)

function animation(t = 0) {
    console.log(t);
    requestAnimationFrame(animation);
    // mesh.scale.setScalar(Math.cos(t * 0.0007))

    mesh.rotation.y = t * 0.0005;
    mesh.rotation.x = t * 0.0001;
    WireMesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera)
}

animation();
