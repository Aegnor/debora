class Detector {
  constructor() {
    this.navigator = window.navigator;
    this.isTouch = this.navigator.userAgentData.mobile;
  }
}

const Detection = new Detector();
export default Detection;
