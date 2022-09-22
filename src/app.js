// Styles
import './styles/app.scss';

// Libs
import Scrollbar from 'smooth-scrollbar';

// Utilities
import { debounce } from 'lodash';

// Classes
import Detection from '@scripts/classes/Detection';
import Background from '@scripts/classes/Background';
import WebGLManager from '@scripts/classes/WebGLManager';

// Components
import Header from '@components/Header';

// Pages
import Home from './pages/Home';

class App {
  constructor() {
    this.$body = document.body;

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    const fov = WebGLManager.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * WebGLManager.camera.position.z;
    const width = height * WebGLManager.camera.aspect;

    this.viewport = {
      height,
      width,
    };

    this.createHeader();
    this.createSmoothScroll();
    this.background = new Background();
    this.home = new Home({ viewport: this.viewport });

    if (Detection.isTouch === true) {
      this.$body.classList.add('is-touchevents');
    } else {
      this.$body.classList.add('is-desktop');
    }

    this.render();
    this.addEventListeners();
  }

  createHeader() {
    this.$headerSelector = this.$body.querySelector('.page-header');
    if (this.$headerSelector) {
      this.header = new Header(this.$headerSelector);
    }
  }

  createSmoothScroll() {
    if (Detection.isTouch === false) {
      this.scrollbarOptions = {};
      Scrollbar.init(document.querySelector('.js-smooth-scroll'), this.scrollbarOptions);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onResize() {
    WebGLManager.onResize();
    const fov = WebGLManager.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * WebGLManager.camera.position.z;
    const width = height * WebGLManager.camera.aspect;

    this.viewport = {
      height,
      width,
    };
    this.home.onResize({ viewport: this.viewport });
  }

  render() {
    this.background.update();
    this.home.update();
    WebGLManager.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }

  addEventListeners () {
    window.addEventListener('resize', debounce(this.onResize.bind(this), 150));
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
