// Libs
import {
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  DoubleSide,
} from 'three';

// Shaders
import AudioFragmentShader from '@shaders/home-frag.glsl';
import AudioVertexShader from '@shaders/home-vert.glsl';

// Classes
import AudioAnalyser from '../../classes/AudioAnalyser';
import ThreeManager from '../../classes/ThreeManager';

export default class Home {
  constructor() {
    this.height = 128;
    this.width = 128;
    this.widthSegments = 26;
    this.heightSegments = 4;

    this.uniforms = {
      u_time: {
        type: 'f',
        value: 4.2,
      },
      u_amplitude: {
        type: '',
        value: 10.0,
      },
      u_data_arr: {
        type: 'float[64]',
        value: AudioAnalyser.getFrequency(),
      },
    };

    this.createGeometry();
    this.createMaterial();
    this.createElement();
  }

  createGeometry() {
    this.geometry = new PlaneGeometry(this.width, this.width, this.widthSegments, this.heightSegments);
  }

  createMaterial() {
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: AudioVertexShader,
      fragmentShader: AudioFragmentShader,
      wireframe: true,
      side: DoubleSide,
    });
  }

  createElement() {
    this.plane = new Mesh(this.geometry, this.material);

    this.plane.rotation.x = -Math.PI / 2 + Math.PI / 4;
    this.plane.position.y = 12;

    ThreeManager.scene.add(this.plane);
  }

  update(time) {
    this.uniforms.u_time.value = time;
    this.uniforms.u_data_arr.value = AudioAnalyser.getFrequency();

    const speed = -0.001;
    this.plane.rotation.z += speed;
    this.plane.rotation.x += speed;
    this.plane.rotation.y += speed;
  }
}
