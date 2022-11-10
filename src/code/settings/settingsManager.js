/**
 * Clase para manejar las configuraciones
 */

const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

class SettingsManager {
  /* 
    Este método carga las configuraciones en RAM a través del objeto Window del navegador.
  */
  static async loadSettings(settingsPath) {
    // Si no existe el directorio de configuraciones, crearlo
    if (!fs.existsSync(settingsPath)) {
      await mkdir(settingsPath);
    }

    // Leer el directorio de configuraciones
    const appData = await readdir(settingsPath);
  
    // Si no hay un archivo de configuraciones existente
    if (!appData.includes('settings.json')) {
      // Se crea un nuevo archivo de configuraciones basandose en el que está empaqueta con el programa en el directorio de assets/settings
      const defaultSettings = await readFile('./src/code/assets/settings/defaultSettings.json', 'utf-8');
      const error = await writeFile(`${settingsPath}/settings.json`, defaultSettings);

      if (error) {
        console.log(error);
      }


      // Se asigna el objeto de configuraciones al objeto global 'Window'
      window.settings = JSON.parse(defaultSettings);
    } else {

      const writtenSettings = JSON.parse(await readFile(`${settingsPath}/settings.json`, 'utf-8'));
      
      const defaultSettingsString = await readFile('./src/code/assets/settings/defaultSettings.json', 'utf-8');
      const defaultSettings = JSON.parse(defaultSettingsString);

      if (defaultSettings.metadata.version > writtenSettings.metadata.version) {
        // TODO: Overwrite new settings
        const error = await writeFile(`${settingsPath}/settings.json`, defaultSettingsString);

        if (error) {
          console.log(error);
        }

        window.settings = defaultSettings;
      } else {
        window.settings = writtenSettings;
      }
    }
  }

  // Obtener una configuración desde el objeto de configuración global
  static getSetting(requestedSetting) {
    const [categoryName, settingName] = requestedSetting.split('.');

    const settings = window.settings.settings;

    let category;
    for (let i = 0; i < settings.length; i++) {
      if (settings[i].name === categoryName) {
        category = settings[i];
        break;
      }
    }

    if (!category) {
      return;
    }

    let setting;
    for (let i = 0; i < category.settings.length; i++) {
      if (category.settings[i].name === settingName) {
        setting = category.settings[i];
        break;
      }
    }

    if (!setting) {
      return;
    }

    return setting;
  }
}

export default SettingsManager;
