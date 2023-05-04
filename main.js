import './style.css'
import * as THREE from 'three';
import data from '/Data/Lokalizacja.json';

var Lokaizacje = data["Lokalizacja"];

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
const palnet = new THREE.Mesh( geometry, material );
scene.add( palnet );
camera.position.z = 5;
palnet.rotation.x = 0.1;
palnet.rotation.y = Math.PI/2*3;
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
			palnet.rotation.y += 0.001;
			if(palnet.rotation.y>Math.PI/2*3+Math.PI*2) palnet.rotation.y=Math.PI/2*3;
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
	
	if(palnet.scale.x <= etapdistance && palnet.scale.y <= etapdistance && palnet.scale.z <= etapdistance) etap = 2;
	if(etap == 1)
	{
		if(etapdistance<palnet.scale.x) palnet.scale.x -= scaleSpeed;
		if(etapdistance<palnet.scale.y) palnet.scale.y -= scaleSpeed;
		if(etapdistance<palnet.scale.z) palnet.scale.z -= scaleSpeed;
	}
	if(etap == 2)
	{
		if(s>palnet.scale.x) palnet.scale.x += scaleSpeed;
		if(s>palnet.scale.y) palnet.scale.y += scaleSpeed;
		if(s>palnet.scale.z) palnet.scale.z += scaleSpeed;
		
		if(s<palnet.scale.x) palnet.scale.x -= scaleSpeed;
		if(s<palnet.scale.y) palnet.scale.y -= scaleSpeed;
		if(s<palnet.scale.z) palnet.scale.z -= scaleSpeed;

		if(x>palnet.rotation.x)palnet.rotation.x += goToLocationSpeed;
		if(x<palnet.rotation.x) palnet.rotation.x -= goToLocationSpeed;

		if(y>palnet.rotation.y) palnet.rotation.y += goToLocationSpeed;
		if(y<palnet.rotation.y) palnet.rotation.y -= goToLocationSpeed;

		if(z>palnet.rotation.z) palnet.rotation.z += goToLocationSpeed;
		if(z<palnet.rotation.z) palnet.rotation.z -= goToLocationSpeed;
	}

	renderer.render( scene, camera );
}

function Zoom(id = 1)
{
	
	var Select = document.querySelector("#ListElement"+id);
	Select.addEventListener("click",()=>
	{
		for(var i = 0;i<Lokaizacje.length;i++)
		{
			if(Lokaizacje[i].id==Select.value)
			{
				x = Lokaizacje[i].x;
				y = Lokaizacje[i].y;
				z = Lokaizacje[i].z;
				s = Lokaizacje[i].s;
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
	for(var i=0;i<Lokaizacje.length;i++)
	{
		
		if(String(Lokaizacje[i].Name).match(text))
		{
			ListaArrayToText += '<li id="ListElement'+id+'" class="ListElement" value="'+Lokaizacje[i].id+'">'+Lokaizacje[i].Name+'</li>';
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








