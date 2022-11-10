const remote = require('@electron/remote');

import { eventEmitter } from './events/eventEmitter.js';
import SettingsManager from './settings/settingsManager.js';

async function init() {
  window.appDataPath = `${remote.app.getPath('appData').split('\\').join('/')}/sauc`;
  console.log(window.appDataPath);
  await SettingsManager.loadSettings(appDataPath);
  // await SettingsManager.loadSettings();

  window.language = SettingsManager.getSetting('general.selectedLanguage');

  eventEmitter.emit('ready');
}

init();
