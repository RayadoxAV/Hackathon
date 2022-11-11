/*Importa las ventanas de electron y los componentes necesarios para la ejecución*/
const { app, BrowserWindow } = require('electron');
const path = require('path');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

function createWindow () {
  const mainWindow = new BrowserWindow({
    title: 'SAUC',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false
    }
  });
  remoteMain.enable(mainWindow.webContents);

  // mainWindow.setMenu(null);
  mainWindow.loadFile('./src/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
