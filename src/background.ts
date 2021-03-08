'use strict'
const path = require('path')
import {
  app,
  protocol,
  BrowserWindow,
  dialog,
  MessageBoxReturnValue,
  ipcMain
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension /*,{ VUEJS_DEVTOOLS }*/ from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

import { autoUpdater } from 'electron-updater' //引入 autoUpdater

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false //解决第一次显示时画面闪烁问题 # https://www.electronjs.org/docs/api/browser-window#%E4%BD%BF%E7%94%A8ready-to-show%E4%BA%8B%E4%BB%B6
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.once('ready-to-show', () => {
    win.show()
  }) //解决第一次显示时画面闪烁问题 # https://www.electronjs.org/docs/api/browser-window#%E4%BD%BF%E7%94%A8ready-to-show%E4%BA%8B%E4%BB%B6

  if (!isDevelopment) {
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-downloaded', () => {
      dialog
        .showMessageBox({
          type: 'info',
          title: '提示',
          message: '有新版本已经下载完毕，是否立即安装？',
          buttons: ['ok', 'cancel']
        })
        .then((res: MessageBoxReturnValue) => {
          if (res.response == 0) {
            //下载完成后执行 quitAndInstall
            autoUpdater.quitAndInstall() //关闭软件并安装新版本
          } else {
            //关闭应用程序时安装
          }
        })
    })
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // try {
    //   await installExtension(VUEJS_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//主进程监听渲染进程 最大化最小话操作
ipcMain.on('win-close', (event, arg) => {
  BrowserWindow.getFocusedWindow()?.close()
})

ipcMain.on('win-max', (event, arg) => {
  let win: BrowserWindow | null = BrowserWindow.getFocusedWindow()
  try {
    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  } catch (e) {}
})

ipcMain.on('win-min', (event, arg) => {
  BrowserWindow.getFocusedWindow()?.minimize()
})
