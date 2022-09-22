// Styles
import './style.scss';

// Components
import FloatingImage from '@components/FloatingImage';

export default class Home {
  constructor({ viewport }) {
    this.floatingImage = new FloatingImage({
      selector: '.js-floating-image',
      targetImage: '.js-floating-image-target',
      viewport,
    });
  }

  update() {
    this.floatingImage.update();
  }

  onResize({viewport}) {
    this.floatingImage.onResize({ viewport });
  }
}
