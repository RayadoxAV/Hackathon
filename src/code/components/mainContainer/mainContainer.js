import Util from '../../util/util.js';

class MainContainer {
  html = '<div class="main-container" id="main-container"></div>';
  element = undefined;

  constructor({side, center }, parent) {
    this.side = side;
    this.center = center;

    this.element = Util.createComponent(this.html);
    
    document.getElementById(parent).appendChild(this.element);
    this.element.appendChild(this.side.element);
    this.element.appendChild(this.center.element);
  }
}

export default MainContainer;
