// Libs
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

class MainScene {
  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createStats();
    this.createOrbitControls();
  }

  createScene() {
    this.scene = new Scene();

    return this;
  }

  createCamera() {
    this.camera = new PerspectiveCamera(45, this.width / this.height, 1, 10000);

    this.camera.aspect = this.width / this.height;
    this.updateCameraPositionIfLandscape();
    this.camera.updateProjectionMatrix();

    return this;
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    this.renderer.domElement.setAttribute('id', 'main-scene');
    document.body.appendChild(this.renderer.domElement);

    return this;
  }

  createStats() {
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    return this;
  }

  createOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    return this;
  }

  updateCameraPositionIfLandscape() {
    const isLandscape = this.height > this.width;
    if (isLandscape) {
      this.camera.position.z = 300;
    } else {
      this.camera.position.z = 200;
    }
  }

  onResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.camera.aspect = this.width / this.height;
    this.updateCameraPositionIfLandscape();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  update() {
    this.stats.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

const MainSceneInit = new MainScene();
export default MainSceneInit;
