// Styles
import './style.scss';

// Libs
import gsap from 'gsap';

// Audio Analyser
import AudioAnalyser from '@scripts/classes/AudioAnalyser';

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

    this.nextCallback = this.next.bind(this);
    this.previousCallback = this.previous.bind(this);
    this.toggleCallback = this.toggle.bind(this);
    this.onLoadCallback = this.onLoad.bind(this);
    this.onPauseCallback = this.onPause.bind(this);
    this.onPlayingCallback = this.onPlaying.bind(this);

    this.show();
  }

  show () {
    gsap.to(this.element, {
      opacity: 1,
      ease: 'back',
      duration: 1.4,
    });
  }

  hide () {
    console.log(this, 'hide');
  }

  next () {
    AudioAnalyser.next();
    return this;
  }

  previous () {
    AudioAnalyser.previous();
    return this;
  }

  toggle () {
    AudioAnalyser.toggle();
    return this;
  }

  addEventListeners () {
    this.elements.buttonNext.addEventListener('click', this.nextCallback);
    this.elements.buttonPrevious.addEventListener('click', this.previousCallback);
    this.elements.buttonToggle.addEventListener('click', this.toggleCallback);

    AudioAnalyser.audio.addEventListener('canplay', this.onLoadCallback);
    AudioAnalyser.audio.addEventListener('pause', this.onPauseCallback);
    AudioAnalyser.audio.addEventListener('playing', this.onPlayingCallback);
  }

  removeEventListeners () {
    this.elements.buttonNext.removeEventListener('click', this.nextCallback);
    this.elements.buttonPrevious.removeEventListener('click', this.previousCallback);
    this.elements.buttonToggle.removeEventListener('click', this.toggleCallback);
  }

  onLoad () {
    this.elements.title.innerHTML = AudioAnalyser.information.name;
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
