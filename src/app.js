// Styles
import './styles/app.scss';

// Libs
import Scrollbar from 'smooth-scrollbar';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
} from 'three';

// Utilities
import { debounce } from 'lodash';

// Classes
import Detection from '@scripts/classes/Detection';
import Background from '@scripts/classes/Background';

// Components
import Header from '@components/Header';

// Pages
import Home from './pages/Home';

class App {
  constructor() {
    this.$body = document.body;

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createScene();
    this.createCamera();
    this.createRenderer();

    this.createHeader();
    this.createSmoothScroll();
    this.createBackground();
    this.home = new Home();

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

  createBackground() {
    this.background = new Background();
    this.scene.add(this.background.mesh);
  }

  createScene() {
    this.scene = new Scene();
  }

  createCamera() {
    this.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    );

    this.camera.aspect = this.width / this.height;
    this.camera.position.z = 2;
    this.camera.updateProjectionMatrix();
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;

    this.renderer.domElement.setAttribute('id', 'gl-scene');
    document.body.appendChild(this.renderer.domElement);
  }

  onResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.background.update();
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }

  addEventListeners () {
    window.addEventListener('resize', debounce(this.onResize.bind(this), 350));
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
