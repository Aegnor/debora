// Styles
import './styles/app.scss';

// Libs
import imagesLoaded from 'imagesloaded';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MathUtils } from 'three';

// Plugins
import ScrollSmoother from '@scripts/plugins/ScrollSmoother';

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

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    this.createSmoothScroll();
    this.createHeader();
    this.createBackground();
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

  createBackground() {
    this.background = new Background();

    gsap.to(this.background, {
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress }) => {
          this.background.startColor = MathUtils.lerp(0, 0.3, progress);
        },
      },
    });
  }

  createSmoothScroll() {
    if (Detection.isTouch === false) {
      this.scrollSmoother = ScrollSmoother.create({
        content: '.js-smooth-scroll',
        smooth: 1.5,
        effects: true,
      });
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

const preloadImages = new Promise((resolve) => {
  imagesLoaded(
    document.querySelectorAll('img'),
    {
      background: true,
    },
    resolve,
  );
});

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  preloadImages.then(() => {
    preloader.style.display = 'none';
    // eslint-disable-next-line no-unused-vars
    const app = new App();
  });
});
