// Styles
import './style.scss';

// Audio Analyser
import AudioAnalyser from '../../scripts/classes/AudioAnalyser';

export default class AudioPlayer {
  constructor(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.elements = {
      buttonNext: this.element.querySelector('.js-player-next'),
      buttonPrevious: this.element.querySelector('.js-player-previous'),
      buttonToggle: this.element.querySelector('.js-player-toggle'),
      iconPause: this.element.querySelector('.js-player-pause'),
      iconPlay: this.element.querySelector('.js-player-play'),
      title: this.element.querySelector('.js-player-title'),
    };
    this.audioAnalyser = new AudioAnalyser();

    this.nextCallback = this.next.bind(this);
    this.previousCallback = this.previous.bind(this);
    this.toggleCallback = this.toggle.bind(this);
    this.onLoadCallback = this.onLoad.bind(this);
    this.onPauseCallback = this.onPause.bind(this);
    this.onPlayingCallback = this.onPlaying.bind(this);
  }

  show () {
    console.log(this, 'show');
  }

  hide () {
    console.log(this, 'hide');
  }

  next () {
    this.audioAnalyser.next();
  }

  previous () {
    this.audioAnalyser.previous();
  }

  toggle () {
    this.audioAnalyser.toggle();
  }

  addEventListeners () {
    this.elements.buttonNext.addEventListener('click', this.nextCallback);
    this.elements.buttonPrevious.addEventListener('click', this.previousCallback);
    this.elements.buttonToggle.addEventListener('click', this.toggleCallback);

    this.audioAnalyser.audio.addEventListener('canplay', this.onLoadCallback);
    this.audioAnalyser.audio.addEventListener('pause', this.onPauseCallback);
    this.audioAnalyser.audio.addEventListener('playing', this.onPlayingCallback);
  }

  removeEventListeners () {
    this.elements.buttonNext.removeEventListener('click', this.nextCallback);
    this.elements.buttonPrevious.removeEventListener('click', this.previousCallback);
    this.elements.buttonToggle.removeEventListener('click', this.toggleCallback);
  }

  onLoad () {
    this.elements.title.innerHTML = this.audioAnalyser.information.name;
  }

  onPause () {
    this.elements.iconPause.style.display = 'none';
    this.elements.iconPlay.style.display = 'block';
  }

  onPlaying () {
    this.elements.iconPause.style.display = 'block';
    this.elements.iconPlay.style.display = 'none';
  }

  init() {
    this.onLoadCallback();
    this.addEventListeners();
  }
}
