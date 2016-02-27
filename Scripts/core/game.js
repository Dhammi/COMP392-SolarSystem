/// <reference path="_reference.ts"/>
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var RingGeometry = THREE.RingGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axis;
var ambientLight;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
var object_mercury;
var object_venus;
var object_earth;
var object_mars;
var object_jupiter;
var object_saturn;
var object_uranus;
//Sun
var sun;
//Planets and moons
var mesh_mercury;
var mesh_venus;
var mesh_earth;
var mesh_mars;
var mesh_jupiter;
var mesh_saturn;
var ring;
var mesh_uranus;
var moon_earth;
var moon_jupiter;
function init() {
    //add new scene
    scene = new Scene();
    setupRenderer();
    setupCamera();
    //add new axis helper
    axis = new AxisHelper(20);
    scene.add(axis);
    console.log("Axis Helper added to scene...");
    //add sun
    sun = new gameObject(new SphereGeometry(3, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/sun.jpg") }), 0, 0, 0);
    scene.add(sun);
    console.log("Sun added to scene...");
    //add game objects
    object_mercury = new Object3D();
    object_venus = new Object3D();
    object_earth = new Object3D();
    object_mars = new Object3D();
    object_jupiter = new Object3D();
    object_saturn = new Object3D();
    object_uranus = new Object3D();
    object_mercury.position.set(0, 0, 0);
    object_venus.position.set(0, 0, 0);
    object_earth.position.set(0, 0, 0);
    object_mars.position.set(0, 0, 0);
    object_jupiter.position.set(0, 0, 0);
    object_saturn.position.set(0, 0, 0);
    object_uranus.position.set(0, 0, 0);
    sun.add(object_mercury);
    sun.add(object_venus);
    sun.add(object_earth);
    sun.add(object_mars);
    sun.add(object_jupiter);
    sun.add(object_saturn);
    sun.add(object_uranus);
    //add mercury
    mesh_mercury = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mercury.jpg") }), -5, 0, 0);
    object_mercury.add(mesh_mercury);
    console.log("Mercury added to scene...");
    //add venus
    mesh_venus = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/venus.jpg") }), -10, 0, 0);
    object_venus.add(mesh_venus);
    console.log("Venus added to scene...");
    //add earth
    mesh_earth = new gameObject(new SphereGeometry(1.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/earth.jpg") }), -13, 0, 0);
    object_earth.add(mesh_earth);
    console.log("Earth added to scene...");
    //add earth's moon
    moon_earth = new gameObject(new SphereGeometry(0.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/moon.jpg") }), -1.5, 0, 1.5);
    mesh_earth.add(moon_earth);
    console.log("Earth's moon added to scene...");
    //add mars
    mesh_mars = new gameObject(new SphereGeometry(1.1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/mars.jpg") }), -16, 0, 0);
    object_mars.add(mesh_mars);
    console.log("Mars added to scene...");
    //add jupiter
    mesh_jupiter = new gameObject(new SphereGeometry(2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/jupiter.jpg") }), -21, 0, 0);
    object_jupiter.add(mesh_jupiter);
    console.log("Jupiter added to scene...");
    //add jupiter's moon
    moon_jupiter = new gameObject(new SphereGeometry(0.7, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/moon.jpg") }), -2.5, 0, 2.5);
    mesh_jupiter.add(moon_jupiter);
    console.log("Jupiter's moon added to scene...");
    //add saturn
    mesh_saturn = new gameObject(new SphereGeometry(1.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/saturn.jpg") }), -25, 0, 0);
    object_saturn.add(mesh_saturn);
    console.log("Saturn added to scene...");
    //add saturn's ring
    ring = new gameObject(new RingGeometry(1.5, 2, 32, 32, 0, Math.PI * 2), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/ring.jpg"), wireframe: true }), -25, 0, 0);
    ring.rotation.y = 10;
    ring.rotation.x = 20;
    object_saturn.add(ring);
    console.log("Saturn's ring added to scene...");
    //add uranus
    mesh_uranus = new gameObject(new SphereGeometry(1.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("img/uranus.jpg") }), -28, 0, 0);
    object_uranus.add(mesh_uranus);
    console.log("Uranus added to scene...");
    //add ambientLight to the scene
    ambientLight = new AmbientLight(0xa5a5a5);
    scene.add(ambientLight);
    console.log("Ambient Light added to Scene");
    //add a PointLight to the scene
    pointLight = new PointLight(0xffffff);
    pointLight.castShadow = true;
    pointLight.intensity = 1;
    pointLight.shadowMapHeight = 2048;
    pointLight.shadowMapWidth = 2048;
    scene.add(pointLight);
    console.log("PointLight added to the scene");
    //add controls
    gui = new GUI();
    control = new Control(0.002);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Stats added to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	   
    window.addEventListener('resize', onResize, false);
}
function gameLoop() {
    stats.update();
    //orbit of the planets
    object_mercury.rotation.y += 0.06;
    object_venus.rotation.y += 0.05;
    object_earth.rotation.y += 0.04;
    object_mars.rotation.y += 0.03;
    object_jupiter.rotation.y += 0.015;
    object_saturn.rotation.y += 0.01;
    object_uranus.rotation.y += 0.007;
    //orbit of moon 
    mesh_earth.rotation.y += 0.03;
    moon_earth.rotation.y += 0.06;
    mesh_jupiter.rotation.y += 0.01;
    moon_jupiter.rotation.y += 0.03;
    requestAnimationFrame(gameLoop);
    renderer.render(scene, camera);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'zoomInEarth');
    gui.add(controlObject, 'zoomInJupiter');
    gui.add(controlObject, 'zoom').listen();
}
//setup renderer for the scene
function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
//setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -50;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map