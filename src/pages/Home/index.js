// Styles
import './style.scss';

// Components
import FloatingImage from '@components/FloatingImage';
import FlyImage from '@components/FlyImage';

// Classes
import Scroll from '@scripts/classes/Scroll';

export default class Home {
  constructor() {
    this.$html = document.querySelector('html');
    this.floatingImage = new FloatingImage({
      selector: '.js-floating-image',
      targetImage: '.js-floating-image-target',
    });

    this.scrollTop = this.$html.scrollTop;

    this.$buttonAnchorScrollDown = document.querySelectorAll('.js-anchor-scroll');
    this.$buttonAnchorScrollDown.forEach((button) => {
      button.addEventListener('click', () => {
        const { anchorTo } = button.dataset;
        const element = document.querySelector(anchorTo);

        if (element) {
          this.$html.scrollTop = element.offsetTop;
        } else {
          console.warn('Can not find element to scroll got:', element);
        }
      });
    });

    this.flyImages = [];
    this.images = document.querySelectorAll('.projects__image');
    this.images.forEach((image) => {
      // eslint-disable-next-line no-param-reassign
      image.parentElement.style = `--height: ${image.clientHeight}px`;
      this.flyImages.push(new FlyImage({ selector: image }));
    });
  }

  update() {
    this.floatingImage.update();

    if (Scroll.scrollSmoother) {
      this.scrollTop = Scroll.scrollSmoother.scrollTop();
    }

    this.flyImages.forEach((image) => {
      image.update(0, this.scrollTop);
    });
  }

  onResize() {
    this.floatingImage.onResize();

    if (Scroll.scrollSmoother) {
      this.scrollTop = Scroll.scrollSmoother.scrollTop();
    }

    this.images.forEach((image) => {
      // eslint-disable-next-line no-param-reassign
      image.parentElement.style = `--height: ${image.clientHeight}px`;
    });

    this.flyImages.forEach((image) => {
      image.onResize(0, this.scrollTop);
    });
  }
}
