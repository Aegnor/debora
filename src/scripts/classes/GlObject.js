// Libs
import { Object3D } from 'three';

// Classes
import WebGLManager from '@scripts/classes/WebGLManager';

export default class GlObject extends Object3D {
  constructor($element) {
    super();

    this.$element = $element;
    this.setBounds();
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

  setBounds() {
    this.rect = this.$element.getBoundingClientRect();

    this.bounds = {
      left: this.rect.left,
      top: this.rect.top + window.scrollY,
      width: this.rect.width,
      height: this.rect.height,
    };
  }

  calculateScaleSize() {
    this.viewport = this.calculateViewport(WebGLManager.camera.position.z - this.position.z);

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

    let posY = (this.viewport.height / 2) - (this.scale.y / 2);
    posY -= ((top - y) / window.innerHeight) * this.viewport.height;

    return posY;
  }

  calculatePositionX(x = 0) {
    const { left } = this.bounds;

    let posX = -(this.viewport.width / 2) + (this.scale.x / 2);
    posX += ((left + x) / window.innerWidth) * this.viewport.width;

    return posX;
  }
}
