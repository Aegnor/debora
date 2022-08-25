import { noop } from 'lodash';
import songs from '../../data/songs';

class AudioAnalyser {
  constructor() {
    // eslint-disable-next-line no-undef
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.volume = 1;

    this.audio.addEventListener('ended', this.next.bind(this));

    this.frequency = new Uint8Array(512);

    this.song = {
      current: Math.floor(Math.random() * songs.length),
      previous: null,
      next: null,
    };

    this.information = {
      name: songs[this.song.current].name,
      link: songs[this.song.current].link,
    };

    this.startCallback = this.start.bind(this);
    window.addEventListener('mousedown', this.startCallback);
  }

  start () {
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.connect(this.context.destination);

    this.src = this.context.createMediaElementSource(this.audio);
    this.src.connect(this.analyser);

    this.load(this.song.current);

    window.removeEventListener('mousedown', this.startCallback);
  }

  getFrequency () {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequency);
    }

    return this.frequency;
  }

  load (song, callback = noop) {
    this.song.current = song;
    this.song.previous = (this.song.current !== 0) ? this.song.current - 1 : songs.length - 1;
    this.song.next = (this.song.current !== songs.length - 1) ? this.song.current + 1 : 0;

    this.information = {
      name: songs[this.song.current].name,
      link: songs[this.song.current].link,
    };

    this.audio.src = `${songs[song].link}`;
    callback();
  }

  previous () {
    this.load(this.song.previous, this.play.bind(this));
  }

  next () {
    this.load(this.song.next, this.play.bind(this));
  }

  pause () {
    this.audio.pause();
  }

  play () {
    this.audio.play();
  }

  toggle () {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
}

const Analyser = new AudioAnalyser();
export default Analyser;
