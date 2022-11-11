// Libs
import { gsap } from 'gsap';

// Plugins
import ScrollSmoother from '@scripts/plugins/ScrollSmoother';

class Scroll {
  constructor() {
    gsap.registerPlugin(ScrollSmoother);
  }

  init() {
    this.scrollSmoother = ScrollSmoother.create({
      content: '.js-smooth-scroll',
      smooth: 1.5,
      effects: true,
    });
  }
}

export default new Scroll();
