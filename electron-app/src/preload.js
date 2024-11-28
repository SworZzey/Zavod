const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getJsonData: () => ipcRenderer.invoke('get-json-data'),
    saveOrder: (orderData) => ipcRenderer.invoke('save-order', orderData),
    loadOrders: () => ipcRenderer.invoke('load-orders'),
    updateOrderStatus: ({ orderId, newStatus }) => ipcRenderer.invoke('update-order-status', { orderId, newStatus }),


    getZadData: () => ipcRenderer.invoke('get-zad-data'),
    saveZad: (taskData) => ipcRenderer.invoke('save-zad', taskData),
    loadZads: () => ipcRenderer.invoke('load-tasks'),


    getRedData: () => ipcRenderer.invoke('get-red-data'),
    saveRed: (redData) => ipcRenderer.invoke('save-red', redData),
    loadReds: () => ipcRenderer.invoke('load-reds')
});
