// Styles
import './styles/app.scss';

// Libs
import Scrollbar from 'smooth-scrollbar';

// Utilities
import { debounce } from 'lodash';

// Classes
import MainScene from '@scripts/classes/MainScene';
import Detection from '@scripts/classes/Detection';

// Components
import AudioPlayer from '@components/AudioPlayer';
import Header from '@components/Header';

// Pages
import Background from '@scripts/classes/Background';
import Home from './pages/Home';

class App {
  constructor() {
    this.$body = document.body;

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.createAudioPlayer();
    this.createHeader();
    this.home = new Home();

    this.background = new Background();
    if (Detection.isTouch === true) {
      this.$body.classList.add('is-touchevents');
    }
    if (Detection.isTouch === false) {
      this.scrollbarOptions = {};
      Scrollbar.init(document.querySelector('.js-smooth-scroll'), this.scrollbarOptions);
    }

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
