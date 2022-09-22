// Libs
import {
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  Color,
  PointLight,
  PerspectiveCamera,
} from 'three';

class WebGLManager {
  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.nearPlane = 0.1;
    this.farPlane = 1000;
    this.perspective = 2;
    this.fov = 75;
    this.aspectRatio = this.width / this.height;

    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createLights();
  }

  createScene() {
    this.scene = new Scene();
  }

  createCamera() {
    this.camera = new PerspectiveCamera(
      this.fov,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane,
    );

    this.camera.aspect = this.aspectRatio;
    this.camera.position.z = this.perspective;
    this.camera.updateProjectionMatrix();
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;

    this.renderer.domElement.setAttribute('id', 'gl-scene');
    document.body.appendChild(this.renderer.domElement);
  }

  createLights() {
    this.lightColor = new Color('#fff');

    this.light = new PointLight(this.lightColor, 1, 0);
    this.light.position.set(1, 1, 100);

    this.scene.add(this.light);
  }

  onResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.aspectRatio = this.width / this.height;
    this.camera.aspect = this.aspectRatio;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default new WebGLManager();
