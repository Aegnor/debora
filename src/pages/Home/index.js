// Styles
import './style.scss';

// Components
import FloatingImage from '@components/FloatingImage';

export default class Home {
  constructor() {
    this.floatingImage = new FloatingImage({
      selector: '.js-floating-image',
      targetImage: '.js-floating-image-target',
    });
  }

  update() {
    this.floatingImage.update();
  }

  onResize() {
    this.floatingImage.onResize();
  }
}
