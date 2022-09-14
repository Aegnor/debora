// Styles
import './style.scss';

// Components
import FloatingImage from '@components/FloatingImage';

export default class Home {
  constructor() {
    this.floatingImage = new FloatingImage('.js-floating-image');
  }
}
