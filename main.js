import './style.css'

var height = window.innerHeight;
var width = window.innerWidth;


import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize( width,height );
renderer.setClearColor( 0xffffff, 0);
document.getElementById("PlacePlanet").appendChild( renderer.domElement );

const UVTexture = new THREE.TextureLoader().load('/assets/Earth/Texture.png');
const geometry = new THREE.SphereGeometry( 2, 40, 40 );
const material = new THREE.MeshStandardMaterial( { map: UVTexture } );
const palnet = new THREE.Mesh( geometry, material );
scene.add( palnet );
camera.position.z = 5;

const light = new THREE.PointLight( 0xffffff );
light.position.set( 17, 15, 20 );
scene.add( light );


function animate() {
	requestAnimationFrame( animate );

	palnet.rotation.y += 0.001;

	renderer.render( scene, camera );
}

animate();
