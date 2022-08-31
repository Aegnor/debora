// Styles
import './style.scss';

export default class Header {
  constructor(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.elements = {
      hamburgerMenu: this.element.querySelector('.js-hamburger-trigger'),
    };

    this.addEventListeners();
  }

  addEventListeners() {
    this.elements.hamburgerMenu.addEventListener('click', () => {
      this.elements.hamburgerMenu.classList.toggle('is--opened');
    });
  }
}
