import { eventEmitter } from '../../events/eventEmitter.js';
import Util from '../../util/util.js';

class NavigationRail {
  html = {
    win32: `<div class="navigation-rail surface" id="navigation-rail">
    <span class="time label-medium">
     
    </span>
    <div>
      <div class="item" target-container="home">
      <span class="icon-container">
        <span class="material-symbols-rounded">
          <img src="./code/assets/icons/home.svg"></img>
        </span>
      </span>
      <span class="title">${window.lang.home}</span>
    </div>
    <div class="item" target-container="users">
      <span class="icon-container">
        <span class="material-symbols-rounded">
          <img src="./code/assets/icons/users.svg"></img>
        </span>
      </span>
      <span class="title">${window.lang.users}</span>
    </div>
    <div class="item" target-container="control">
      <span class="icon-container">
        <span class="material-symbols-rounded">
        <img src="./code/assets/icons/key_FILL0_wght400_GRAD0_opsz48.svg"></img>
        </span>
      </span>
      <span class="title">${window.lang.control}</span>
    </div>
    <div class="item" target-container="devices">
      <span class="icon-container">
        <span class="material-symbols-rounded">
        <img src="./code/assets/icons/sync_saved_locally_FILL0_wght400_GRAD0_opsz48.svg"></img>
        </span>
      </span>
      <span class="title">${window.lang.devices}</span>
      </div>
    </div>
    <div class="item" target-container="settings">
      <span class="icon-container">
        <span class="material-symbols-rounded">
        <img src="./code/assets/icons/settings_FILL0_wght400_GRAD0_opsz48.svg"></img>
        </span>
      </span>
      <span class="title">${window.lang.settings}</span>
    </div>
  </div>`
  }
  
  flyout = '<div class="flyout"></div>';


  constructor() {
    this.element = Util.createComponent(this.html['win32']);

    this.element.addEventListener('click', (event) => {
      if (event.target && event.target.getAttribute('target-container')) {
        
          eventEmitter.emit('changeContainer', { container: event.target.getAttribute('target-container') });
        
      }
    });
    this.updateTime();
    
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const time = new Date().toLocaleTimeString();
    this.element.querySelector('.time').innerHTML = time;
  }
}

export default NavigationRail;
