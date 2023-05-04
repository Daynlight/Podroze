import './style.css'
import * as THREE from 'three';
import DataLokations from '/Data/Lokalizacja.json';

var LocationsArray = DataLokations["Lokalizacja"];
var Height = window.innerHeight;
var Width = window.innerWidth;
var RotatePlanet = true;
var RollPlanet = true;
var OldLocationsArray = {value: ''};
var AnimationStage = 1;
var AnimationZoomOut = 1.5;
var AnimationScaleSpeed = 0.005;
var AnimationMoveSpeed = 0.005;
var PlanetXTarget;
var PlanetYTarget;
var PlanetZTarget;
var PlanetScaleTarget;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, Width / Height, 0.001, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize( Width,Height );
renderer.setClearColor( 0xffffff, 0);
document.getElementById("PlacePlanet").appendChild( renderer.domElement );

const UVPlanetTexture = new THREE.TextureLoader().load('/assets/Earth/Texture.png');
const geometry = new THREE.SphereGeometry( 2, 40, 40 );
const material = new THREE.MeshStandardMaterial( { map: UVPlanetTexture } );
const planet = new THREE.Mesh( geometry, material );
scene.add( planet );
camera.position.z = 5;
planet.rotation.x = 0.1;
planet.rotation.y = Math.PI/2*3;

const light = new THREE.PointLight( 0xffffff );
light.position.set( 17, 15, 20 );
scene.add( light );

function PlanetDefaultAnimation() {
	if(RotatePlanet)
	{
		requestAnimationFrame( animate );
		if(RollPlanet)
		{
			planet.rotation.y += 0.001;
			if(planet.rotation.y>Math.PI/2*3+Math.PI*2) planet.rotation.y=Math.PI/2*3;
		}

		renderer.render( scene, camera );
	}
}

PlanetDefaultAnimation();


function SearchLocation()
{
	
	var Lokalizacja = document.querySelector("#Lokalizacja");
	if(OldLocationsArray.value != Lokalizacja.value)
	{
		OldLocationsArray.value = Lokalizacja.value;
		GenerateLocationsList(Lokalizacja.value);
	};
	setInterval(SearchLocation,1000);
}

SearchLocation();

function GenerateLocationsList(text)
{
	var id = 1;
	var ListaArrayToText = '<ul id="listaArray">';
	for(var i=0;i<LocationsArray.length;i++)
	{
		
		if(String(LocationsArray[i].Name).match(text))
		{
			ListaArrayToText += '<li id="ListElement'+id+'" class="ListElement" value="'+LocationsArray[i].id+'">'+LocationsArray[i].Name+'</li>';
			id++;
		}
	}
	ListaArrayToText += '</ul>';
	document.getElementById("lista").innerHTML = ListaArrayToText;
	for(var i = 1; i< document.querySelector("#listaArray").childElementCount+1;i++)
	{
		AnimatePlanetGoToLocation(i);
	}
}
GenerateLocationsList();

async function AnimatePlanetZoom()
{
	
	requestAnimationFrame( AnimatePlanetZoom );
	
	if(planet.scale.x <= AnimationZoomOut && planet.scale.y <= AnimationZoomOut && planet.scale.z <= AnimationZoomOut) etap = 2;
	if(AnimationStage == 1)
	{
		if(AnimationZoomOut<planet.scale.x) planet.scale.x -= AnimationScaleSpeed;
		if(AnimationZoomOut<planet.scale.y) planet.scale.y -= AnimationScaleSpeed;
		if(AnimationZoomOut<planet.scale.z) planet.scale.z -= AnimationScaleSpeed;
	}
	if(AnimationStage == 2)
	{
		if(PlanetScaleTarget>planet.scale.x) planet.scale.x += AnimationScaleSpeed;
		if(PlanetScaleTarget>planet.scale.y) planet.scale.y += AnimationScaleSpeed;
		if(PlanetScaleTarget>planet.scale.z) planet.scale.z += AnimationScaleSpeed;
		
		if(PlanetScaleTarget<planet.scale.x) planet.scale.x -= AnimationScaleSpeed;
		if(PlanetScaleTarget<planet.scale.y) planet.scale.y -= AnimationScaleSpeed;
		if(PlanetScaleTarget<planet.scale.z) planet.scale.z -= AnimationScaleSpeed;

		if(PlanetXTarget>planet.rotation.x)planet.rotation.x += AnimationMoveSpeed;
		if(PlanetXTarget<planet.rotation.x) planet.rotation.x -= AnimationMoveSpeed;

		if(PlanetYTarget>planet.rotation.y) planet.rotation.y += AnimationMoveSpeed;
		if(PlanetYTarget<planet.rotation.y) planet.rotation.y -= AnimationMoveSpeed;

		if(PlanetZTarget>planet.rotation.z) planet.rotation.z += AnimationMoveSpeed;
		if(PlanetZTarget<planet.rotation.z) planet.rotation.z -= AnimationMoveSpeed;
	}

	renderer.render( scene, camera );
}

function AnimatePlanetGoToLocation(id = 1)
{
	
	var Select = document.querySelector("#ListElement"+id);
	Select.addEventListener("click",()=>
	{
		for(var i = 0;i<LocationsArray.length;i++)
		{
			if(LocationsArray[i].id==Select.value)
			{
				PlanetXTarget = LocationsArray[i].x;
				PlanetYTarget = LocationsArray[i].y;
				PlanetZTarget = LocationsArray[i].z;
				PlanetScaleTarget = LocationsArray[i].s;
				AnimationStage = 1;
				RollPlanet = false;
				RotatePlanet = false;
				AnimatePlanetZoom()

			}

		}

	})
}










