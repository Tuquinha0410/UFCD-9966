import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111827);
const luzAmbiente = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add( luzAmbiente);

//Sol
const sol = new THREE.DirectionalLight(0xffffff, 1.8);
sol.position.set(5, 8, 4);
sol.castShadow = true;
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;
sol.shadow.camera.near = 0.5;
sol.shadow.camera.far = 23;

scene.add(sol);


// 2. Criar Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
 // 2.1 Criar Chão
 const chaoGeo = new THREE.PlaneGeometry(15, 15); 
 const chaoMat=new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.5 });
const chao = new THREE.Mesh(chaoGeo, chaoMat);
 chao.position.y = -4;
 chao. rotation.x = -Math.PI / 2;
 chao.receiveShadow = true;
 scene.add(chao);
 
 
 // 3. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// 4. Criar um cubo
const cubo= new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial({ color: 0x00ff00 ,roughness: 0.5, metalness: 0.1 }));
// 5. Adicionar o cubo à Scene
cubo.position.x =-3;  
cubo.castShadow = true;
cubo.receiveShadow = true;
scene.add(cubo);
// 7. Adicionar esfera e cone

const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.5,  metalness: 0.5 }));
esfera.position.x = 0;
esfera.castShadow = true;
esfera.receiveShadow = true;

scene.add(esfera);

const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), new THREE.MeshStandardMaterial({ color: 0x00ffff , roughness: 0.5,  metalness: 0.5 }));
cone.position.x = 3;
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);

// 6. Criar função animar()
let velocidade = 1;
let pausado = false;
function animar() {
  requestAnimationFrame(animar);
  if (!pausado) {
  cubo.rotation.x += 0.01*velocidade;
  cubo.rotation.y += 0.014*velocidade;
  esfera.rotation.y += 0.014*velocidade;
  cone.rotation.z += 0.12*velocidade;
  cone.rotation.x += 0.18*velocidade;
  }
renderer.render(scene, camera);
}
animar();

// 8. Implementar os botões
document.querySelector("#pausa").addEventListener("click", function() {
  pausado = !pausado;
  this.textContent = pausado? "Continuar" : "Pausar";
});
decument.querySelector("#lento").addEventListener("click", function() {
  velocidade = 0.4;
});
decument.querySelector("#normal").addEventListener("click", function() {
  velocidade = 3;
});
decument.querySelector("#rapido").addEventListener("click", function() {
  velocidade = 1;
});
document.querySelector("#reset").addEventListener("click", function() {
  velocidade = 3;
  pausado = false;
  cubo.rotation.x = 0;
  cubo.rotation.y = 0;
  esfera.rotation.y = 0;
  cone.rotation.z = 0;
  cone.rotation.x = 0;
});



