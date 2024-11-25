const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL('http://localhost:3000'); // Или путь к вашему React приложению
});

// Путь к файлу JSON
console.log('Current __dirname:', __dirname);
const dbPath = path.resolve(__dirname, '..', '..', 'react-app', 'src', 'components', 'application', 'bd.json');
console.log('Resolved Path:', dbPath);

// Обработчик события сохранения
ipcMain.on('save-order', (event, orderData) => {
  try {
    let data = {};
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath);
      data = JSON.parse(fileData);
    }

    const newId = Object.keys(data).length + 1;
    data[newId] = orderData;

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
    event.sender.send('order-saved', true);
  } catch (error) {
    console.error('Error saving data:', error);
    event.sender.send('order-saved', false);
  }
});
