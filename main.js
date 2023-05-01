import './style.css'

var height = window.innerHeight/4*3;
var width = window.innerWidth;


import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize( width,height );
renderer.setClearColor( 0xffffff, 0);
document.getElementById("planet").appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
