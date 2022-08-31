// Styles
import './styles/app.scss';

// Utilities
import { debounce } from 'lodash';

// Classes
import MainScene from '@scripts/classes/MainScene';

// Components
import AudioPlayer from '@components/AudioPlayer';
import Header from '@components/Header';

// Pages
import Home from '@scripts/pages/Home';
import Background from '@scripts/classes/Background';

class App {
  constructor() {
    this.$body = document.documentElement;

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createAudioPlayer();
    this.createHeader();
    this.home = new Home();

    this.background = new Background();

    this.render();
    this.addEventListeners();
  }

  createAudioPlayer() {
    this.$audioPlayerSelector = this.$body.querySelector('.js-player');
    if (this.$audioPlayerSelector) {
      this.audioPlayer = new AudioPlayer(this.$audioPlayerSelector);
      this.audioPlayer.init();
    }
  }

  createHeader() {
    this.$headerSelector = this.$body.querySelector('.page-header');
    if (this.$headerSelector) {
      this.header = new Header(this.$headerSelector);
    }
  }

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
