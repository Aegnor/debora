// Libs
import {
  Mesh,
  TextureLoader,
  ShaderMaterial,
  PlaneGeometry,
  Clock,
} from 'three';
import glsl from 'glslify';
import gsap from 'gsap';

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';
import GlImage from '@scripts/classes/GlImage';
import Scroll from '@scripts/classes/Scroll';

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
        uVelocity: {
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

  update(x, y, velocity) {
    if (this.visible) {
      if (Scroll.isScrolling) {
        gsap.to(this.mesh.material.uniforms.uProgress, {
          value: 1,
          duration: 3,
        });
      } else {
        gsap.to(this.mesh.material.uniforms.uProgress, {
          value: 0,
          duration: 3,
        });
      }
      this.mesh.material.uniforms.uVelocity.value = velocity / 500;

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
