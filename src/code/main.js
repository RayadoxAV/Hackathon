const remote = require('@electron/remote');

import { eventEmitter } from './events/eventEmitter.js';
import SettingsManager from './settings/settingsManager.js';

/* Componentes */
import NavigationRail from './components/navRail/navRail.js';
import MainContainer from './components/mainContainer/mainContainer.js';
import Container from './components/container/container.js';
import Users from './components/navRail/user/userMenu.js'
import Control from './components/navRail/control/controlMenu.js'
import Devices from './components/navRail/devices/devicesMenu.js'
import Settings from './components/navRail/settings/settingsMenu.js'
import Home from './components/navRail/home/home.js'
import LanguageManager from './languages/languageManager.js';

async function init() {
  window.appDataPath = `${remote.app.getPath('appData').split('\\').join('/')}/sauc`;
  await SettingsManager.loadSettings(appDataPath);

  window.selectedLanguage = SettingsManager.getSetting('general.selectedLanguage');
  await LanguageManager.loadSelectedLanguage(window.selectedLanguage.value);
  window.getListGen = (name) => {
    switch (name) {
      case 'selectedLanguage': {
        
      }

      case 'selectedTheme': {
        break;
      }
    }
  }

  const userMenu = new Users();
  const controlMenu = new Control();
  const devicesMenu = new Devices();
  const settingsMenu = new Settings();
  const homeMenu = new Home();

  const navigationRail = new NavigationRail({user:userMenu,control:controlMenu,settings:settingsMenu,devices:devicesMenu},'main-container');
  const container = new Container();
  const mainContainer = new MainContainer({ side: navigationRail, center: container }, 'body');

  container.setComponent(devicesMenu);

  eventEmitter.emit('ready');
  eventEmitter.on('changeContainer', (args) => {
    switch (args.container) {
      case 'users': {
        container.setComponent(userMenu);
        break;
      }
      case 'control': {
        container.setComponent(controlMenu);
        break;
      }

      case 'devices': {
        container.setComponent(devicesMenu);
        break;
      }

      case 'settings': {
        container.setComponent(settingsMenu);
        break;
      }

      case 'home': {
        container.setComponent(homeMenu);
        break;
      }

      default: {
        
        break;
      }
    }
  });

}

init();
