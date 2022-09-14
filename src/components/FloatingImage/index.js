// Styles
import './style.scss';

// Libs
import gsap from 'gsap';

// Utilities
import { debounce } from 'lodash';

export default class FloatingImage {
  constructor(selector, options = {}) {
    this.$element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.options = options;

    this.targetSelector = this.options.targetSelector ? this.options.targetSelector : '.js-floating-image-target';
    this.$floatingImage = this.$element.querySelector(this.targetSelector);

    this.floatingImageBoundingRect = this.$floatingImage.getBoundingClientRect();

    this.onMouseEnterCallback = this.onMouseEnter.bind(this);
    this.onMouseMoveCallback = this.onMouseMove.bind(this);
    this.onMouseLeaveCallback = this.onMouseLeave.bind(this);
    this.onResizeCallback = this.onResize.bind(this);

    this.addEventListeners();
  }

  getCenterOfImage(event) {
    const imagePosCenterX = this.$floatingImage.offsetWidth / 2;
    const imagePosCenterY = this.$floatingImage.offsetHeight / 2;

    return {
      x: event.clientX - this.floatingImageBoundingRect.left - imagePosCenterX,
      y: event.clientY - this.floatingImageBoundingRect.top - imagePosCenterY,
    };
  }

  onMouseEnter(event) {
    gsap.to(this.$floatingImage, {
      duration: 0.4,
      opacity: 1,
    });

    const { x, y } = this.getCenterOfImage(event);
    gsap.to(this.$floatingImage, {
      x,
      y,
      duration: 0,
    });
  }

  onMouseMove(event) {
    const { x, y } = this.getCenterOfImage(event);

    gsap.to(this.$floatingImage, {
      x,
      y,
      duration: 1,
      ease: 'power3.out',
    });
  }

  onMouseLeave() {
    gsap.to(this.$floatingImage, {
      duration: 0.5,
      opacity: 0,
    });
  }

  onResize() {
    gsap.to(this.$floatingImage, {
      x: 0,
      y: 0,
      duration: 0,
    });

    this.floatingImageBoundingRect = this.$floatingImage.getBoundingClientRect();
  }

  addEventListeners() {
    this.$element.addEventListener('mouseenter', this.onMouseEnterCallback);
    this.$element.addEventListener('mousemove', this.onMouseMoveCallback);
    this.$element.addEventListener('mouseleave', this.onMouseLeaveCallback);

    window.addEventListener('resize', debounce(this.onResizeCallback, 350));
  }

  removeEventListeners() {
    this.$element.removeEventListener('mouseenter', this.onMouseEnterCallback);
    this.$element.removeEventListener('mousemove', this.onMouseMoveCallback);
    this.$element.removeEventListener('mouseleave', this.onMouseLeaveCallback);

    window.removeEventListener('resize', debounce(this.onResizeCallback, 350));
  }
}
