const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getJsonData: () => ipcRenderer.invoke('get-json-data'),
    saveOrder: (orderData) => ipcRenderer.invoke('save-order', orderData),
    loadOrders: () => ipcRenderer.invoke('load-orders') // Здесь добавляется loadOrders
});
