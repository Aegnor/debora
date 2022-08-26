// Styles
import './styles/app.scss';

// Utilities
import { debounce } from 'lodash';

// Classes
import ThreeManager from '@scripts/classes/ThreeManager';

// Components
import AudioPlayer from '@components/AudioPlayer';

// Pages
import Home from '@scripts/pages/Home';

class App {
  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createAudioPlayer();
    this.createHome();

    this.render();
    this.addEventListeners();
  }

  createAudioPlayer() {
    this.audioPlayer = new AudioPlayer('.js-player');
    this.audioPlayer.init();
  }

  createHome() {
    this.home = new Home();
  }

  // eslint-disable-next-line class-methods-use-this
  onResize() {
    ThreeManager.onResize();
  }

  render() {
    this.home.update();

    ThreeManager.update();

    window.requestAnimationFrame(this.render.bind(this));
  }

  addEventListeners () {
    window.addEventListener('resize', debounce(this.onResize.bind(this), 350));
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
