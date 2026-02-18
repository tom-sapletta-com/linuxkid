/**
 * Planeta X – Electron Desktop App
 * 
 * Serves the static site locally and opens it in a desktop window.
 * Optionally starts the progress API server.
 * Supports real terminal sandbox via Docker.
 * 
 * Run: npm run electron
 */

const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const http = require('http');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const STATIC_PORT = 8765;
const API_PORT = 3001;

let mainWindow = null;
let staticServer = null;
let apiServer = null;

// ─── Static file server ───
function startStaticServer() {
  return new Promise((resolve) => {
    const handler = (req, res) => {
      let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
      if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
      const ext = path.extname(filePath);
      const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json', '.png':'image/png', '.ico':'image/x-icon' };
      res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
      fs.createReadStream(filePath).pipe(res);
    };
    staticServer = http.createServer(handler);
    staticServer.listen(STATIC_PORT, '127.0.0.1', () => {
      console.log(`[Static] http://localhost:${STATIC_PORT}`);
      resolve();
    });
  });
}

// ─── Progress API server ───
function startAPIServer() {
  const apiPath = path.join(ROOT, 'progress-api.js');
  if (!fs.existsSync(apiPath)) return;
  try {
    apiServer = spawn('node', [apiPath], {
      cwd: ROOT,
      env: { ...process.env, PORT: String(API_PORT), DB_PATH: path.join(app.getPath('userData'), 'progress.db') },
      stdio: 'pipe',
    });
    apiServer.stdout.on('data', d => console.log('[API]', d.toString().trim()));
    apiServer.stderr.on('data', d => console.error('[API]', d.toString().trim()));
    console.log('[API] Started on port', API_PORT);
  } catch (e) {
    console.warn('[API] Could not start:', e.message);
  }
}

// ─── Main window ───
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Planeta X – Akademia Młodego Odkrywcy',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#0a0b10',
    show: false,
  });

  mainWindow.loadURL(`http://localhost:${STATIC_PORT}/`);
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });

  buildMenu();
}

function buildMenu() {
  const template = [
    {
      label: 'Planeta X',
      submenu: [
        { label: 'Centrum Misji', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/`) },
        { label: 'Konfiguracja', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/config.html`) },
        { type: 'separator' },
        { label: 'Otwórz Terminal Sandbox', click: openSandbox },
        { type: 'separator' },
        { role: 'quit', label: 'Wyjdź' },
      ],
    },
    {
      label: 'Widok',
      submenu: [
        { role: 'reload', label: 'Odśwież' },
        { role: 'toggleDevTools', label: 'Narzędzia deweloperskie' },
        { type: 'separator' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pełny ekran' },
      ],
    },
    {
      label: 'Misje',
      submenu: [
        { label: '🚗 Przylot', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/przylot/`) },
        { label: '🛡️ CyberQuest', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/cyberquest/`) },
        { label: '🌐 Serwer', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/serwer/`) },
        { label: '🤖 Automatyzacja', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/automatyzacja/`) },
        { label: '🐳 Konteneryzacja', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/konteneryzacja/`) },
        { label: '🧬 Kod', click: () => mainWindow.loadURL(`http://localhost:${STATIC_PORT}/kod/`) },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ─── Sandbox terminal ───
function openSandbox() {
  const composePath = path.join(ROOT, 'sandbox', 'docker-compose.yml');
  if (!fs.existsSync(composePath)) {
    shell.showItemInFolder(ROOT);
    return;
  }
  exec(`docker compose -f "${composePath}" up -d`, (err) => {
    if (err) { console.error('Sandbox start error:', err); return; }
    // Open terminal in sandbox container
    const term = spawn('docker', ['exec', '-it', 'planetax-sandbox', 'bash'], { stdio: 'inherit' });
    term.on('close', () => console.log('Sandbox terminal closed'));
  });
}

// ─── IPC handlers ───
ipcMain.handle('run-in-sandbox', async (event, command) => {
  return new Promise((resolve) => {
    exec(`docker exec planetax-sandbox bash -c "${command.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
      resolve({ ok: !err, stdout: stdout || '', stderr: stderr || '', exitCode: err?.code || 0 });
    });
  });
});

ipcMain.handle('sandbox-status', async () => {
  return new Promise((resolve) => {
    exec('docker inspect --format="{{.State.Status}}" planetax-sandbox', (err, stdout) => {
      resolve({ running: stdout.trim() === 'running' });
    });
  });
});

ipcMain.handle('start-sandbox', async () => {
  return new Promise((resolve) => {
    const composePath = path.join(ROOT, 'sandbox', 'docker-compose.yml');
    exec(`docker compose -f "${composePath}" up -d`, (err, stdout) => {
      resolve({ ok: !err, output: stdout });
    });
  });
});

// ─── App lifecycle ───
app.whenReady().then(async () => {
  await startStaticServer();
  startAPIServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (staticServer) staticServer.close();
  if (apiServer) apiServer.kill();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
