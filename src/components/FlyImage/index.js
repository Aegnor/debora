// Libs
import {
  Mesh,
  TextureLoader,
  ShaderMaterial,
  PlaneGeometry,
  Clock,
} from 'three';
import glsl from 'glslify';

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';
import GlImage from '@scripts/classes/GlImage';

// Shaders
import ImageFragmentShader from './shaders/fragment.glsl';
import ImageVertexShader from './shaders/vertex.glsl';

export default class FlyImage extends GlImage {
  constructor({ selector }) {
    const $element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    super($element);

    this.$element = $element;
    this.clock = new Clock();
    this.loader = new TextureLoader();
    this.createMesh();
  }

  createMesh() {
    // eslint-disable-next-line no-undef
    const image = new Image();
    image.src = this.$element.src;

    image.onload = () => {
      this.material.uniforms.uTexture.value = this.loader.load(image.src);
    };

    this.geometry = new PlaneGeometry(1, 1, 32, 32);
    this.material = new ShaderMaterial({
      uniforms: {
        uTexture: {
          value: this.texture,
        },
        uAlpha: {
          value: 1.0,
        },
        uTime: {
          value: 0.0,
        },
        uProgress: {
          value: 0.0,
        },
      },
      vertexShader: glsl(ImageVertexShader),
      fragmentShader: glsl(ImageFragmentShader),
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.initMesh();

    WebGLManager.scene.add(this.mesh);
  }

  update(x, y) {
    if (this.visible) {
      this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();

      this.posX = this.calculatePositionX(x);
      this.posY = this.calculatePositionY(y);

      this.mesh.position.x = this.posX;
      this.mesh.position.y = this.posY;
    }
  }

  onResize() {
    if (!this.visible) return;
    super.resize();
  }
}
