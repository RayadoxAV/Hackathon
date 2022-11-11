import Util from '../../util/util.js';

class Container {
  html = {
    win32: `<div class="container">Chinguen a su madre as</div>`
  }
  
  component = undefined;
  constructor() {
    this.element = Util.createComponent(this.html['win32']);
  }

  setComponent(component) {
    this.element.innerHTML = '';
    this.component = component;

    this.element.appendChild(component.element);
  }
}

export default Container;
