// Libs
import { gsap } from 'gsap';

// Plugins
import ScrollSmoother from '@scripts/plugins/ScrollSmoother';

// Utilities
import { debounce } from 'lodash';

class Scroll {
  constructor() {
    gsap.registerPlugin(ScrollSmoother);

    this.isScrolling = false;
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  init() {
    this.scrollSmoother = ScrollSmoother.create({
      content: '.js-smooth-scroll',
      smooth: 1.5,
      effects: true,
    });
  }

  onScroll() {
    this.isScrolling = true;
    debounce(() => {
      this.isScrolling = false;
    }, 300)();
  }
}

export default new Scroll();
