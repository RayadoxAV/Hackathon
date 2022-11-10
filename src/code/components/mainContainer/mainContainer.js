import Util from '../../util/util.js';

class MainContainer {
  html = '<div></div>';
  element = undefined;

  constructor({ top, side, center }, parent) {
    this.top = top;
    this.side = side;
    this.center = center;

    this.element = Util.createCompontent(this.html);
    
    document.getElementById(parent).appendChild(this.element);
    this.element.appendChild(this.top.element);
    this.element.appendChild(this.side.element);
    this.element.appendChild(this.center.element);
  }
}

export default MainContainer;
