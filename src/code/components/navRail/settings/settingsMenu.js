import { eventEmitter } from '../../../events/eventEmitter.js';
import Util from '../../../util/util.js';

class settingsMenu {

  activeTabIndex = -1;
  container = undefined

  html = {
    win32: 
    `<div class="cont settings">
      <span class="header">${window.lang.settings}</span>
      <div class="tab-container" id="settings-tab-container">
      </div>
      <div id="settings-container" class="content"></div>           
    </div>`
  }

  constructor() {
    this.element = Util.createComponent(this.html['win32']);
    this.container = this.element.querySelector('#settings-container');
    this.tabsContainer = this.element.querySelector('#settings-tab-container');
    this.generateTabs();
    this.selectTab(0);
  }

  generateTabs() {
    let tabsHTML = '';
    for (let i = 0; i < window.settings.settings.length; i++) {
      const setting = window.settings.settings[i];
      if (setting.name === 'debug') {
        continue;
      }
      tabsHTML += `<div class="tab">${window.lang[setting.name]}</div>`;
    }

    this.tabsContainer.innerHTML = tabsHTML;
  }

  generateContent(settingIndex) {
    let contentHTML = '';
    const mainSetting = window.settings.settings[settingIndex];
    for (let i = 0; i < mainSetting.settings.length; i++) {
      const setting = mainSetting.settings[i];
      contentHTML += `<span class="setting-title">${window.lang[setting.name]}<span>`;
      contentHTML += `<p class="setting-description">${window.lang[setting.description.split('$')[1]]}</p>`

      switch (setting.type) {
        case 'list-gen': {
          const list = window.getListGen(setting.name);
          contentHTML += `<select></select>`;
          break;
        }
      }
    }

    return contentHTML;
  }

  selectTab(tabIndex) {
    this.container.innerHTML = this.generateContent(tabIndex);
  }
}

export default settingsMenu;