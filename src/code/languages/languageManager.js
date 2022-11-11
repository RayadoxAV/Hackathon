const fs = require('fs');
const { promisify } = require('util');
import SettingsManager from '../settings/settingsManager.js';

const readFile = promisify(fs.readFile);
class LanguageManager {
  static async loadSelectedLanguage(language) {
    const selectedLanguageString = await readFile(`./src/code/assets/languages/${language}.json`, { encoding: 'utf-8' });
    const selectedLanguage = JSON.parse(selectedLanguageString);
    window.lang = selectedLanguage.words;
  }
}

export default LanguageManager;
