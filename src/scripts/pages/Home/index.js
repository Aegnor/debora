// Libs
import {
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  DoubleSide,
} from 'three';
import gsap from 'gsap';

// Shaders
import AudioFragmentShader from '@shaders/home-frag.glsl';
import AudioVertexShader from '@shaders/home-vert.glsl';

// Classes
import AudioAnalyser from '@scripts/classes/AudioAnalyser';
// import MainScene from '@scripts/classes/MainScene';

export default class Home {
  constructor() {
    this.height = 128;
    this.width = 128;
    this.widthSegments = 26;
    this.heightSegments = 3;

    this.uniforms = {
      u_amplitude: {
        type: '',
        value: 10.0,
      },
      u_data_arr: {
        type: 'float[64]',
        value: AudioAnalyser.getFrequency(),
      },
    };

    this.geometry = new PlaneGeometry(this.width, this.width, this.widthSegments, this.heightSegments);
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: AudioVertexShader,
      fragmentShader: AudioFragmentShader,
      wireframe: true,
      opacity: 0,
      side: DoubleSide,
    });
    this.plane = new Mesh(this.geometry, this.material);

    this.plane.rotation.x = -Math.PI / 2 + Math.PI / 4;
    this.plane.position.y = 14;

    // MainScene.scene.add(this.plane);

    gsap.from(this.plane.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'back',
      duration: 1.4,
    });
  }

  update() {
    this.uniforms.u_data_arr.value = AudioAnalyser.getFrequency();
  }
}
