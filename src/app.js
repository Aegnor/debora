// Styles
import './styles/app.scss';

// Utilities
import { debounce } from 'lodash';

// Classes
import MainScene from '@scripts/classes/MainScene';

// Components
import AudioPlayer from '@components/AudioPlayer';

// Pages
import Home from '@scripts/pages/Home';
import Background from '@scripts/classes/Background';

class App {
  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createAudioPlayer();
    this.createHome();
    this.createBackground();

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

  createBackground() {
    this.background = new Background();
  }

  // eslint-disable-next-line class-methods-use-this
  onResize() {
    MainScene.onResize();
    this.background.onResize();
  }

  render() {
    this.home.update();
    this.background.update();

    MainScene.update();

    window.requestAnimationFrame(this.render.bind(this));
  }

  addEventListeners () {
    window.addEventListener('resize', debounce(this.onResize.bind(this), 350));
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
