const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Путь к JSON-файлу в директории данных приложения
const dbPath = path.join(__dirname, 'data', 'bd.json');

// Функция для проверки и создания файла JSON
const ensureDbFile = () => {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({}));
  }
};

// Создаём окно приложения
app.on('ready', () => {
  ensureDbFile();

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:3000'); // Или путь к вашему React приложению
});

// IPC-обработчик для получения данных из JSON
ipcMain.handle('get-json-data', async () => {
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return { success: true, data };
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return { success: false, error: 'Не удалось загрузить данные.' };
  }
});

// IPC-обработчик для записи данных в JSON
ipcMain.handle('save-order', async (event, orderData) => {
  try {
    const fileData = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(fileData);

    const newId = Object.keys(data).length + 1;
    data[newId] = orderData;

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));

    console.log(`Order #${newId} saved successfully.`);
    return { success: true, message: `Order #${newId} saved successfully.` };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, error: 'Не удалось сохранить данные.' };
  }
});

// IPC-обработчик для загрузки заказов
ipcMain.handle('load-orders', async () => {
  try {
    const fileData = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(fileData);
    return { success: true, data };
  } catch (err) {
    console.error('Error loading orders:', err);
    return { success: false, error: 'Не удалось загрузить заказы.' };
  }
});
