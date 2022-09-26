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
import Preloader from '@components/Preloader';

// Pages
import Home from './pages/Home';

class App {
  constructor() {
    this.$body = document.body;

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

  onResize() {
    WebGLManager.onResize();
    this.home.onResize();
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

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
  const app = new App();
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'none';
});
