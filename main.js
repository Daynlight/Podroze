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

PlanetDefaultAnimation();
SearchLocation();
GenerateLocationsList();


async function PlanetDefaultAnimation() {
	if(planet.rotation.y>Math.PI/2*3+Math.PI*2) planet.rotation.y=Math.PI/2*3;
	if(planet.rotation.x>Math.PI*2) planet.rotation.x=0;
	if(planet.rotation.z>Math.PI*2) planet.rotation.z=0;

	if(RotatePlanet)
	{
		requestAnimationFrame( PlanetDefaultAnimation );
		if(RollPlanet)
		{
			planet.rotation.y += 0.001;
		}

		renderer.render( scene, camera );
	}
}


function SearchLocation()
{
	
	var GetLokalizationDataFromForm = document.querySelector("#SchearchPlace");
	if(OldLocationsArray.value != GetLokalizationDataFromForm.value)
	{
		OldLocationsArray.value = GetLokalizationDataFromForm.value;
		GenerateLocationsList(GetLokalizationDataFromForm.value);
	};
	setTimeout(SearchLocation,1000);
}
function GenerateLocationsList(text)
{
	var id = 1;
	var GeneratedList = '<ul id="ListaArray">';
	for(var i=0;i<LocationsArray.length;i++)
	{
		if(String(LocationsArray[i].Name).match(text))
		{
			GeneratedList += '<li id="ListElement'+id+'" class="ListElement" value="'+LocationsArray[i].id+'">'+LocationsArray[i].Name+'</li>';
			id++;
		}
	}
	GeneratedList += '</ul>';
	document.getElementById("Lista").innerHTML = GeneratedList;
	for(var i = 1; i< document.querySelector("#ListaArray").childElementCount+1;i++)
	{
		AddOnClickFunctionForListElements(i);
	}
}

function PlanetGoToAnimation()
{
	if(planet.rotation.y>Math.PI/2*3+Math.PI*2) planet.rotation.y=Math.PI/2*3;
	if(planet.rotation.x>Math.PI*2) planet.rotation.x=0;
	if(planet.rotation.z>Math.PI*2) planet.rotation.z=0;
	requestAnimationFrame( PlanetGoToAnimation );
	
	var Distance = Math.sqrt(Math.pow(PlanetXTarget-planet.rotation.x,2)+Math.pow(PlanetYTarget-planet.rotation.y,2));

	var Distance1 = Math.abs(planet.rotation.y - PlanetXTarget - Math.PI/2*3);
	var Distance2 = Math.abs((2 * Math.PI) - Distance1);

	if(AnimationStage==1 && planet.scale.x <= AnimationZoomOut && planet.scale.y <= AnimationZoomOut && planet.scale.z <= AnimationZoomOut) AnimationStage = 2;
	if((AnimationStage==2 && (Distance<AnimationMoveSpeed+0.002 || 2 * Math.PI - Distance<AnimationMoveSpeed+0.002)) && (PlanetZTarget-planet.rotation.z<AnimationMoveSpeed+0.002)) 
	AnimationStage = 3;
	if(AnimationStage==3 &&PlanetScaleTarget-planet.scale.x<AnimationScaleSpeed) AnimationStage=4;

	if(AnimationStage == 1)
	{
		if(AnimationZoomOut<planet.scale.x) planet.scale.x -= AnimationScaleSpeed;
		if(AnimationZoomOut<planet.scale.y) planet.scale.y -= AnimationScaleSpeed;
		if(AnimationZoomOut<planet.scale.z) planet.scale.z -= AnimationScaleSpeed;
		
	}
	if(AnimationStage == 2)
	{

		if(PlanetXTarget>planet.rotation.x)planet.rotation.x += AnimationMoveSpeed;
		if(PlanetXTarget<planet.rotation.x) planet.rotation.x -= AnimationMoveSpeed;

		if(PlanetZTarget>planet.rotation.z) planet.rotation.z += AnimationMoveSpeed;
		if(PlanetZTarget<planet.rotation.z) planet.rotation.z -= AnimationMoveSpeed;

		

		if(Distance1 < Distance2 && planet.rotation.y > PlanetYTarget) planet.rotation.y -= AnimationMoveSpeed; 
		if(Distance1 >= Distance2 && planet.rotation.y > PlanetYTarget) planet.rotation.y += AnimationMoveSpeed; 
		if(Distance1 < Distance2 && planet.rotation.y < PlanetYTarget) planet.rotation.y += AnimationMoveSpeed; 
		if(Distance1 >= Distance2 && planet.rotation.y < PlanetYTarget) planet.rotation.y -= AnimationMoveSpeed; 

	}
	if(AnimationStage == 3)
	{
		if(PlanetScaleTarget>planet.scale.x) planet.scale.x += AnimationScaleSpeed;
		if(PlanetScaleTarget>planet.scale.y) planet.scale.y += AnimationScaleSpeed;
		if(PlanetScaleTarget>planet.scale.z) planet.scale.z += AnimationScaleSpeed;
		
		if(PlanetScaleTarget<planet.scale.x) planet.scale.x -= AnimationScaleSpeed;
		if(PlanetScaleTarget<planet.scale.y) planet.scale.y -= AnimationScaleSpeed;
		if(PlanetScaleTarget<planet.scale.z) planet.scale.z -= AnimationScaleSpeed;
		
	}
	
	
	renderer.render( scene, camera );
	
}
PlanetGoToAnimation();
function AddOnClickFunctionForListElements(id = 1)
{
	var ListElement = document.querySelector("#ListElement"+id);
	ListElement.addEventListener("click",()=>
	{
		for(var i = 0;i<LocationsArray.length;i++)
		{
			if(LocationsArray[i].id==ListElement.value)
			{
				PlanetXTarget = LocationsArray[i].x;
				PlanetYTarget = LocationsArray[i].y;
				PlanetZTarget = LocationsArray[i].z;
				PlanetScaleTarget = LocationsArray[i].s;
				AnimationStage = 1;
				RollPlanet = false;
				RotatePlanet = false;
				
			}
		}
	})
}










