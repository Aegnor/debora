// Libs
import { Object3D } from 'three';

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';

export default class GlImage extends Object3D {
  constructor($image) {
    super();

    this.$image = $image;
  }

  // eslint-disable-next-line class-methods-use-this
  calculateViewport(distance = WebGLManager.camera.position.z) {
    const fov = WebGLManager.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * distance;
    const width = height * WebGLManager.camera.aspect;

    return {
      height,
      width,
    };
  }

  initMesh() {
    this.resize();
  }

  setBounds() {
    this.rect = this.$image.getBoundingClientRect();

    this.bounds = {
      left: this.rect.left,
      top: this.rect.top + window.scrollY,
      width: this.rect.width,
      height: this.rect.height,
    };

    this.updateScale();
    this.updatePosition();
  }

  resize() {
    if (!this.visible) {
      return;
    }

    const position = this.mesh ? this.mesh.position : this.position;
    this.viewport = this.calculateViewport(WebGLManager.camera.position.z - position.z);
    this.setBounds();
  }

  calculateScaleSize() {
    const x = this.bounds.width / window.innerWidth;
    const y = this.bounds.height / window.innerHeight;

    if (!x || !y) {
      return false;
    }

    return {
      x: this.viewport.width * x,
      y: this.viewport.height * y,
    };
  }

  calculatePositionY(y = 0) {
    const { top } = this.bounds;
    const scale = this.mesh ? this.mesh.scale : this.scale;

    let posY = (this.viewport.height / 2) - (scale.y / 2);
    posY -= ((top - y) / window.innerHeight) * this.viewport.height;

    return posY;
  }

  calculatePositionX(x = 0) {
    const { left } = this.bounds;
    const scale = this.mesh ? this.mesh.scale : this.scale;

    let posX = -(this.viewport.width / 2) + (scale.x / 2);
    posX += ((left + x) / window.innerWidth) * this.viewport.width;

    return posX;
  }

  updateScale() {
    if (!this.mesh) {
      return;
    }

    const { x, y } = this.calculateScaleSize();

    this.mesh.scale.x = x;
    this.mesh.scale.y = y;
  }

  updatePosition(x, y) {
    this.updatePositionX(x);
    this.updatePositionY(y);
  }

  updatePositionX(x = 0) {
    if (this.mesh) {
      this.mesh.position.x = this.calculatePositionX(x);
    }
  }

  updatePositionY(y = 0) {
    if (this.mesh) {
      this.mesh.position.y = this.calculatePositionX(y);
    }
  }
}
