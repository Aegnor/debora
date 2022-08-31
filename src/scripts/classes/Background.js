// Libs
import {
  Vector3,
  SphereBufferGeometry,
  Mesh,
  ShaderMaterial,
  DoubleSide,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
} from 'three';

// Shaders
import BackgroundFragmentShader from '@shaders/background-frag.glsl';
import BackgroundVertexShader from '@shaders/background-vert.glsl';

export default class Background {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.time = 0;
    this.startColor = 0;

    this.createScene();
    this.createCamera();
    this.createRenderer();

    this.createMaterial();
    this.createGeometry();
    this.createPlane();
  }

  createScene() {
    this.scene = new Scene();

    return this;
  }

  createCamera() {
    this.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    );

    this.camera.aspect = this.width / this.height;
    this.camera.position.z = 2;
    this.camera.updateProjectionMatrix();

    return this;
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;

    this.renderer.domElement.setAttribute('id', 'background-scene');
    document.body.appendChild(this.renderer.domElement);

    return this;
  }

  createMaterial() {
    this.material = new ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: DoubleSide,
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        },
        startColor: {
          type: 'f',
          value: 0,
        },
        colorPrimary: {
          type: 'v3',
          value: new Vector3(0.1, 0.1, 0.1),
        },
        colorSecondary: {
          type: 'v3',
          value: new Vector3(0.0, 0.0, 0.0),
        },
      },
      vertexShader: BackgroundVertexShader,
      fragmentShader: BackgroundFragmentShader,
    });
  }

  createGeometry() {
    this.geometry = new SphereBufferGeometry(4.5, 100, 100);
  }

  createPlane() {
    this.plane = new Mesh(this.geometry, this.material);
    this.plane.position.z = -10;
    this.plane.scale.set(3.5, 3.5, 3.5);

    this.scene.add(this.plane);
  }

  onResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  update() {
    this.time += 0.03;
    this.material.uniforms.time.value = this.time;
    this.material.uniforms.startColor.value = this.startColor;

    this.renderer.render(this.scene, this.camera);
  }
}
