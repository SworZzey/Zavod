const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Пути к JSON-файлам
const dbPath = path.join(process.resourcesPath, 'data', 'bd.json'); // Для заказов
const zadPath = path.join(process.resourcesPath, 'data', 'zad.json'); // Для заданий
const redPath = path.join(process.resourcesPath, 'data', 'ready.json'); // Для подготовки участков


// Функция для проверки и создания файла JSON
const ensureFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
};

// Создаём окно приложения
app.on('ready', () => {
  // Убедимся, что файлы существуют
  ensureFileExists(dbPath);
  ensureFileExists(zadPath);
  ensureFileExists(redPath)

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:3000'); // Или путь к вашему React приложению
  //mainWindow.loadFile(path.join(__dirname, 'index.html'))
});

// ========================================================ФОРМА ЗАКАЗОВ================================================================

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

ipcMain.handle('update-order-status', async (event, { orderId, newStatus }) => {
  try {
    const fileData = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(fileData);

    if (data[orderId]) {
      data[orderId].OrderStatus = newStatus; // Изменяем статус заказа
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
      console.log(`Order #${orderId} status updated to "${newStatus}".`);
      return { success: true };
    } else {
      return { success: false, error: 'Заказ с указанным ID не найден.' };
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: 'Не удалось обновить статус заказа.' };
  }
});

// ========================================================ФОРМА ЗАДАНИЙ================================================================

// IPC-обработчик для получения данных из zad.json
ipcMain.handle('get-zad-data', async () => {
  try {
    const data = JSON.parse(fs.readFileSync(zadPath, 'utf-8'));
    return { success: true, data };
  } catch (err) {
    console.error('Error reading zad.json file:', err);
    return { success: false, error: 'Не удалось загрузить данные.' };
  }
});

// IPC-обработчик для записи данных в zad.json
ipcMain.handle('save-zad', async (event, taskData) => {
  try {
    const fileData = fs.readFileSync(zadPath, 'utf-8');
    const data = JSON.parse(fileData);

    const newId = Object.keys(data).length + 1;
    data[newId] = taskData;

    fs.writeFileSync(zadPath, JSON.stringify(data, null, 4));

    console.log(`Task #${newId} saved successfully.`);
    return { success: true, message: `Task #${newId} saved successfully.` };
  } catch (error) {
    console.error('Error saving task:', error);
    return { success: false, error: 'Не удалось сохранить данные задания.' };
  }
});


// IPC-обработчик для загрузки заданий
ipcMain.handle('load-tasks', async () => {
  try {
    const fileData = fs.readFileSync(zadPath, 'utf-8');
    const data = JSON.parse(fileData);
    return { success: true, data };
  } catch (err) {
    console.error('Error loading tasks:', err);
    return { success: false, error: 'Не удалось загрузить задания.' };
  }
});


// ========================================================ФОРМА ПОДГОТОВКИ УЧАСТКА================================================================


ipcMain.handle('get-red-data', async () => {
  try {
    const data = JSON.parse(fs.readFileSync(redPath, 'utf-8'));
    return { success: true, data };
  } catch (err) {
    console.error('Error reading zad.json file:', err);
    return { success: false, error: 'Не удалось загрузить данные.' };
  }
});

// IPC-обработчик для записи данных в ready.json
ipcMain.handle('save-red', async (event, redData) => {
  try {
    const fileData = fs.readFileSync(redPath, 'utf-8');
    const data = JSON.parse(fileData);

    const newId = Object.keys(data).length + 1;
    data[newId] = redData;

    fs.writeFileSync(redPath, JSON.stringify(data, null, 4));

    console.log(`Task #${newId} saved successfully.`);
    return { success: true, message: `Ready #${newId} saved successfully.` };
  } catch (error) {
    console.error('Error saving task:', error);
    return { success: false, error: 'Не удалось сохранить данные задания.' };
  }
});


// IPC-обработчик для загрузки заданий
ipcMain.handle('load-reds', async () => {
  try {
    const fileData = fs.readFileSync(redPath, 'utf-8');
    const data = JSON.parse(fileData);
    return { success: true, data };
  } catch (err) {
    console.error('Error loading tasks:', err);
    return { success: false, error: 'Не удалось загрузить задания.' };
  }
});