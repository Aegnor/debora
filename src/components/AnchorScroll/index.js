export default class AnchorScroll {
  constructor($anchorScrollButtonsSelector = '.js-anchor-scroll') {
    this.$anchorScrollButtons = typeof $anchorScrollButtonsSelector === 'string' ? document.querySelectorAll($anchorScrollButtonsSelector) : $anchorScrollButtonsSelector;
    this.$anchorScrollButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const { anchorTo } = button.dataset;
        const element = document.querySelector(anchorTo);

        if (element) {
          document.querySelector('html').scrollTop = element.offsetTop;
        } else {
          console.warn('Can not find element to scroll got:', element);
        }
      });
    });
  }
}
