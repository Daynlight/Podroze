import './style.css'
import * as THREE from 'three';
import data from '/Data/Lokalizacja.json';

var Lokaizacje = data["Lokalizacja"];

var height = window.innerHeight;
var width = window.innerWidth;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.001, 1000 );

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
palnet.rotation.x = 0.1;
palnet.rotation.y = 5;

const light = new THREE.PointLight( 0xffffff );
light.position.set( 17, 15, 20 );
scene.add( light );

var rool = true;
function animate() {
	requestAnimationFrame( animate );
	if(rool)
	{
		palnet.rotation.y += 0.001;
	}

	renderer.render( scene, camera );
}

animate();

var oldLokalizacja = {value: ''};
function wyszukaj()
{
	
	var Lokalizacja = document.querySelector("#Lokalizacja");
	if(oldLokalizacja.value != Lokalizacja.value)
	{
		oldLokalizacja.value = Lokalizacja.value;
		Lista(Lokalizacja.value);
	};
	setInterval(wyszukaj,1000)
}

wyszukaj();

function Lista(text)
{
	var id = 1;
	var ListaArrayToText = '<ol id="listaArray">';
	for(var i=0;i<Lokaizacje.length;i++)
	{
		
		if(String(Lokaizacje[i].Name).match(text))
		{
			ListaArrayToText += '<li class="ListElement" value="'+(id)+'">'+Lokaizacje[i].Name+'</li>';
			id++;
		}
	}
	ListaArrayToText += '</ol>';
	
	document.getElementById("lista").innerHTML = ListaArrayToText;


}
Lista();

