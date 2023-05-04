import './style.css'
import * as THREE from 'three';
import DataLokations from '/Data/Lokalizacja.json';

var LcationsArray = DataLokations["Lokalizacja"];

var height = window.innerHeight;
var width = window.innerWidth;
var rotate = true;
var rool = true;
var oldLokalizacja = {value: ''};
var etap = 1;
var etapdistance = 1.5;
var scaleSpeed = 0.005;
var goToLocationSpeed = 0.005;
var x;
var y;
var z;
var s;

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
const planet = new THREE.Mesh( geometry, material );
scene.add( planet );
camera.position.z = 5;
planet.rotation.x = 0.1;
planet.rotation.y = Math.PI/2*3;
// const BackUV = new THREE.TextureLoader().load('/assets/Space/Space.png');
// scene.background = BackUV;

const light = new THREE.PointLight( 0xffffff );
light.position.set( 17, 15, 20 );
scene.add( light );

function animate() {
	if(rotate)
	{
		requestAnimationFrame( animate );
		if(rool)
		{
			planet.rotation.y += 0.001;
			if(planet.rotation.y>Math.PI/2*3+Math.PI*2) planet.rotation.y=Math.PI/2*3;
		}

		renderer.render( scene, camera );
	}
}

animate();


function wyszukaj()
{
	
	var Lokalizacja = document.querySelector("#Lokalizacja");
	if(oldLokalizacja.value != Lokalizacja.value)
	{
		oldLokalizacja.value = Lokalizacja.value;
		Lista(Lokalizacja.value);
	};
	setInterval(wyszukaj,1000);
}

wyszukaj();
async function animateZoom()
{
	
	requestAnimationFrame( animateZoom );
	
	if(planet.scale.x <= etapdistance && planet.scale.y <= etapdistance && planet.scale.z <= etapdistance) etap = 2;
	if(etap == 1)
	{
		if(etapdistance<planet.scale.x) planet.scale.x -= scaleSpeed;
		if(etapdistance<planet.scale.y) planet.scale.y -= scaleSpeed;
		if(etapdistance<planet.scale.z) planet.scale.z -= scaleSpeed;
	}
	if(etap == 2)
	{
		if(s>planet.scale.x) planet.scale.x += scaleSpeed;
		if(s>planet.scale.y) planet.scale.y += scaleSpeed;
		if(s>planet.scale.z) planet.scale.z += scaleSpeed;
		
		if(s<planet.scale.x) planet.scale.x -= scaleSpeed;
		if(s<planet.scale.y) planet.scale.y -= scaleSpeed;
		if(s<planet.scale.z) planet.scale.z -= scaleSpeed;

		if(x>planet.rotation.x)planet.rotation.x += goToLocationSpeed;
		if(x<planet.rotation.x) planet.rotation.x -= goToLocationSpeed;

		if(y>planet.rotation.y) planet.rotation.y += goToLocationSpeed;
		if(y<planet.rotation.y) planet.rotation.y -= goToLocationSpeed;

		if(z>planet.rotation.z) planet.rotation.z += goToLocationSpeed;
		if(z<planet.rotation.z) planet.rotation.z -= goToLocationSpeed;
	}

	renderer.render( scene, camera );
}

function Zoom(id = 1)
{
	
	var Select = document.querySelector("#ListElement"+id);
	Select.addEventListener("click",()=>
	{
		for(var i = 0;i<LcationsArray.length;i++)
		{
			if(LcationsArray[i].id==Select.value)
			{
				x = LcationsArray[i].x;
				y = LcationsArray[i].y;
				z = LcationsArray[i].z;
				s = LcationsArray[i].s;
				etap = 1;
				rool = false;
				rotate = false;
				animateZoom()

			}

		}

	})
}

function Lista(text)
{
	var id = 1;
	var ListaArrayToText = '<ul id="listaArray">';
	for(var i=0;i<LcationsArray.length;i++)
	{
		
		if(String(LcationsArray[i].Name).match(text))
		{
			ListaArrayToText += '<li id="ListElement'+id+'" class="ListElement" value="'+LcationsArray[i].id+'">'+LcationsArray[i].Name+'</li>';
			id++;
		}
	}
	ListaArrayToText += '</ul>';
	document.getElementById("lista").innerHTML = ListaArrayToText;
	for(var i = 1; i< document.querySelector("#listaArray").childElementCount+1;i++)
	{
		Zoom(i);
	}
}
Lista();








