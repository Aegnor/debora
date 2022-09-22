// Libs
import {
  Vector3,
  SphereBufferGeometry,
  Mesh,
  ShaderMaterial,
  DoubleSide,
} from 'three';

// Shaders
import BackgroundFragmentShader from '@shaders/background-frag.glsl';
import BackgroundVertexShader from '@shaders/background-vert.glsl';

// Classes
import WebGLManager from './WebGLManager';

export default class Background {
  constructor() {
    this.time = 0;
    this.startColor = 0;

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
    this.geometry = new SphereBufferGeometry(4.5, 10, 10);

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
    this.mesh.scale.set(3.5, 3.5, 3.5);

    WebGLManager.scene.add(this.mesh);
  }

  update() {
    this.time += 0.035;
    this.material.uniforms.time.value = this.time;
    this.material.uniforms.startColor.value = this.startColor;
  }
}
