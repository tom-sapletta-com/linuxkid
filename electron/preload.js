/**
 * Electron preload – exposes safe IPC bridge to renderer
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runInSandbox: (command) => ipcRenderer.invoke('run-in-sandbox', command),
  sandboxStatus: () => ipcRenderer.invoke('sandbox-status'),
  startSandbox: () => ipcRenderer.invoke('start-sandbox'),
  isElectron: true,
});
