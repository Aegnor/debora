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

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';

// Shaders
import ImageFragmentShader from './shaders/fragment.glsl';
import ImageVertexShader from './shaders/vertex.glsl';

export default class FloatingImage {
  constructor({ selector, targetImage, viewport }) {
    this.$element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.$floatingImage = this.$element.querySelector(targetImage);

    this.targetX = 0;
    this.targetY = 0;

    this.floatingImageSize = {
      width: this.$floatingImage.clientWidth,
      height: this.$floatingImage.clientHeight,
    };

    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.viewport = viewport;

    this.onMouseEnterCallback = this.onMouseEnter.bind(this);
    this.onMouseMoveCallback = this.onMouseMove.bind(this);
    this.onMouseLeaveCallback = this.onMouseLeave.bind(this);

    this.addEventListeners();
    this.clock = new Clock();
    this.loader = new TextureLoader();
    this.offset = new Vector2(0, 0);

    this.createMesh();

    this.updateScale();
    this.material.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y];
  }

  createMesh() {
    const image = new Image();
    image.src = this.$floatingImage.src;

    image.onload = () => {
      this.material.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
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
        uImageSizes: {
          value: new Vector2(0, 0),
        },
        uPlaneSizes: {
          value: new Vector2(0, 0),
        },
        uViewportSizes: {
          value: new Vector2(this.viewport.width, this.viewport.height),
        },
        uOffset: {
          value: new Vector2(0, 0),
        },
      },
      vertexShader: ImageVertexShader,
      fragmentShader: ImageFragmentShader,
      transparent: true,
    });
    this.mesh = new Mesh(this.geometry, this.material);

    WebGLManager.scene.add(this.mesh);
  }

  onMouseEnter() {
    gsap.to(this.material.uniforms.uAlpha, {
      duration: 0.4,
      value: 1,
      ease: 'power3.out',
    });
  }

  onMouseMove(event) {
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
      duration: 0.5,
      value: 0,
      ease: 'power3.out',
    });
  }

  onResize({ viewport }) {
    gsap.to(this.mesh.position, {
      x: 0,
      y: 0,
      duration: 0,
    });

    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;

    if (viewport) {
      this.viewport = viewport;
    }

    this.updateScale();
    this.material.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y];
  }

  updateScale() {
    this.mesh.scale.x = (this.viewport.width * this.floatingImageSize.width) / this.screen.width;
    this.mesh.scale.y = (this.viewport.height * this.floatingImageSize.height) / this.screen.height;
  }

  addEventListeners() {
    this.$element.addEventListener('mouseenter', this.onMouseEnterCallback);
    this.$element.addEventListener('mousemove', this.onMouseMoveCallback);
    this.$element.addEventListener('mouseleave', this.onMouseLeaveCallback);
  }

  removeEventListeners() {
    this.$element.removeEventListener('mouseenter', this.onMouseEnterCallback);
    this.$element.removeEventListener('mousemove', this.onMouseMoveCallback);
    this.$element.removeEventListener('mouseleave', this.onMouseLeaveCallback);
  }

  update() {
    // const amplitude = 0.0005;
    // const xAmplitude = (this.targetX - this.offset.x) * amplitude;
    // const yAmplitude = -(this.targetY - this.offset.y) * amplitude;
    // this.material.uniforms.uOffset.value.set(xAmplitude, yAmplitude);
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}
