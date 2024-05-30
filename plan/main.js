import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const pov = 45;
const aspect = w / h;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(pov, aspect, near, far);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 15, -22);
orbit.update();

const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false
    })
);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);
planeMesh.name = 'ground';

const highlightMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
    })
);

highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, 0, 0.5);
scene.add(highlightMesh);

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;

window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1; // Fix this line
    raycaster.setFromCamera(mousePosition, camera);
    intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach(function (intersect) {
        if (intersect.object.name === 'ground') {
            const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
            highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
        }
    });
});

const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 4, 2),
    new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xFFEA00
    })
)

window.addEventListener('mousedown', function () {
    intersects.forEach(function (intersect) {
        if (intersect.object.name === 'ground') {
            const sphereClone = sphereMesh.clone();
            sphereClone.position.copy(highlightMesh.position);
            scene.add(sphereClone);
        }
    });
})

function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation); // Fix this line