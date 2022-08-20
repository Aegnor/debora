// Styles
import './styles/app.scss';

// Components
import AudioPlayer from './components/AudioPlayer';

document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = new AudioPlayer('.js-player');
  audioPlayer.init();
});
