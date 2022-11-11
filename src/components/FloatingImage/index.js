// Styles
import './style.scss';

// Libs
import gsap from 'gsap';
import {
  Mesh,
  TextureLoader,
  ShaderMaterial,
  PlaneGeometry,
  Vector2,
  Clock,
} from 'three';
import glsl from 'glslify';

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';
import GlImage from '@scripts/classes/GlImage';

// Shaders
import ImageFragmentShader from './shaders/fragment.glsl';
import ImageVertexShader from './shaders/vertex.glsl';

export default class FloatingImage extends GlImage {
  constructor({ selector, targetImage }) {
    const $element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    const $floatingImage = $element.querySelector(targetImage);
    super($floatingImage);

    this.$element = $element;
    this.$floatingImage = $floatingImage;

    this.targetX = 0;
    this.targetY = 0;

    this.xLastAmplitude = 0;
    this.yLastAmplitude = 0;

    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.bindAll();
    this.addEventListeners();
    this.clock = new Clock();
    this.loader = new TextureLoader();
    this.offset = new Vector2(0, 0);

    this.createMesh();
  }

  bindAll() {
    ['onMouseEnter', 'onMouseMove', 'onMouseLeave'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  createMesh() {
    // eslint-disable-next-line no-undef
    const image = new Image();
    image.src = this.$floatingImage.src;

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
          value: 0.0,
        },
        uTime: {
          value: 0.0,
        },
        uProgress: {
          value: 0.0,
        },
        uOffset: {
          value: new Vector2(0, 0),
        },
      },
      vertexShader: glsl(ImageVertexShader),
      fragmentShader: glsl(ImageFragmentShader),
      transparent: true,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.initMesh();

    WebGLManager.scene.add(this.mesh);
  }

  onMouseEnter() {
    gsap.to(this.material.uniforms.uAlpha, {
      value: 1,
      ease: 'power3.out',
    });
  }

  onMouseMove(event) {
    gsap.to(this.material.uniforms.uProgress, {
      value: 1,
      duration: 5,
      ease: 'power3.out',
    });

    const viewportWidthHalf = this.viewport.width / 2;
    const viewportHeightHalf = this.viewport.height / 2;

    this.targetX = -viewportWidthHalf + (event.clientX / this.screen.width) * this.viewport.width;
    this.targetY = viewportHeightHalf - (event.clientY / this.screen.height) * this.viewport.height;

    gsap.to(this.mesh.position, {
      x: this.targetX,
      y: this.targetY,
      duration: 1,
      ease: 'power3.out',
    });
  }

  onMouseLeave() {
    gsap.to(this.material.uniforms.uAlpha, {
      value: 0,
      ease: 'power3.out',
    });
  }

  onResize() {
    if (!this.visible) return;
    super.resize();
    gsap.to(this.mesh.position, {
      x: 0,
      y: 0,
      duration: 0,
    });

    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
  }

  addEventListeners() {
    this.$element.addEventListener('mouseenter', this.onMouseEnter);
    this.$element.addEventListener('mousemove', this.onMouseMove);
    this.$element.addEventListener('mouseleave', this.onMouseLeave);
  }

  removeEventListeners() {
    this.$element.removeEventListener('mouseenter', this.onMouseEnter);
    this.$element.removeEventListener('mousemove', this.onMouseMove);
    this.$element.removeEventListener('mouseleave', this.onMouseLeave);
  }

  update() {
    const amplitudeMultiplier = 1.6;
    const xAmplitude = (this.targetX - this.offset.x) * amplitudeMultiplier;
    const yAmplitude = -(this.targetY - this.offset.y) * amplitudeMultiplier;
    gsap.to(this.material.uniforms.uOffset.value, {
      x: xAmplitude,
      y: yAmplitude,
      duration: 5,
      ease: 'power3.out',
    });

    this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();

    // Mouse stopped moving
    this.xLastAmplitude = xAmplitude;
    this.yLastAmplitude = yAmplitude;
    const isMouseXDirectionStopMoving = this.xLastAmplitude === xAmplitude;
    const isMouseYDirectionStopMoving = this.yLastAmplitude === yAmplitude;
    if (isMouseXDirectionStopMoving && isMouseYDirectionStopMoving) {
      gsap.to(this.material.uniforms.uProgress, {
        value: 0,
        duration: 5,
        ease: 'power3.out',
      });
    }
  }
}
