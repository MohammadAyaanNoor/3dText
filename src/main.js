import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { TextureLoader } from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const matcapMaterial = textureLoader.load('../static/textures/matcaps/9.png');
const matcapMaterial2 = textureLoader.load('../static/textures/matcaps/11.png');


// const axes = new THREE.AxesHelper();
// scene.add(axes);

const fontLoader = new FontLoader();
console.time();
fontLoader.load('../static/threejs fonts/Anton_Regular.json',(font)=>{
  const textGeometry = new TextGeometry(
    'Mohammad Ayaan Noor',{
      font:font,
      size:0.7,
      height:0.4,
      depth:0.1,
      curveSegments:5,
      bevelEnabled:true,
      bevelOffset:0,
      bevelThickness:0.09,
      bevelSize:0.02,
      bevelSegments:4,
      
    }
    
  )
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.z -0.03) * 0.5,
  // )
  // textGeometry.computeBoundingBox();
  // console.log(textGeometry.boundingBox);
  textGeometry.center();
  const Material1 = new THREE.MeshMatcapMaterial({matcap:matcapMaterial})
  const Material2 = new THREE.MeshMatcapMaterial({matcap:matcapMaterial2})
  // textMaterial.flatShading = false
  // textMaterial.wireframe = true;
  const text = new THREE.Mesh(textGeometry,Material1);
  scene.add(text);
  
  const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);
  for(let i = 0; i<200; i++){
    const donut = new THREE.Mesh(donutGeometry,Material2);

    donut.position.x = (Math.random() - 0.5) * 15;
    donut.position.y = (Math.random() - 0.5) * 15;
    donut.position.z = (Math.random() - 0.5) * 15;

    const scale = Math.random();
    donut.scale.set(scale,scale,scale);

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    scene.add(donut);
  }
  console.timeEnd()
})

const sizes ={
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 4;
// camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

function tick(){
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();