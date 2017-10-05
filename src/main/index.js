import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const ipc = require('electron').ipcMain;
const session = require("electron").session;
let mainWindow
let tbWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:3000`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 410,
    useContentSize: true,
    width: 480,
    center:true,
    // resizable:false,
    // frame:false,
    hasShadow:true
  })

  mainWindow.loadURL(winURL)
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

//登录窗口
function loginWindow(){
  tbWindow = new BrowserWindow({
    height:600,
    width:400,
    center:true,
    resizable:false,
    //frame:false,
    hasShadow:true
  })
  tbWindow.loadURL(`file://${__dirname}/login.html`);
  // tbWindow.webContents.openDevTools();
  //found-in-page
  //did-get-redirect-request
  
  // tbWindow.webContents.on("did-get-redirect-request", function(){

  //   session.defaultSession.cookies.get({domain:".taobao.com"}, (error, cookies)=>{
  //     mainWindow.webContents.send('loginTB',cookies)
  //     tbWindow.close();
  //   })
  // })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on("loginTB", function(){
  loginWindow()
})

ipc.on("test", function(){
  //先清空所有cookie
  session.defaultSession.cookies.get({domain:".taobao.com"}, (error, cookies)=>{
    mainWindow.webContents.send('loginTB',cookies)

  })
})

ipc.on("getCookie", function(err,res){
  
  session.defaultSession.cookies.get({domain:".taobao.com"}, (error, cookies)=>{
    mainWindow.webContents.send('loginTB',{"cookie":cookies,"pwd":res})
    var ses = tbWindow.webContents.session;
    ses.clearCache(function(){
      console.log("clearCache________")
    });
    tbWindow.close();
  })
})

//关闭窗口
ipc.on("close", function(){
  app.quit();
  //mainWindow.close();
})


//清空session测试
ipc.on("cSession",()=>{
  var ses = tbWindow.webContents.session;
  session.defaultSession.cookies.get({},(error,cookie)=>{
    
    session.defaultSession.cookies.remove(".taobao.com","lgc",(err,res)=>{
      console.log(err,res)
      session.defaultSession.cookies.get({},(e,c)=>{
        console.log(e,c)
      })
    })
  })
  console.log(new Date())
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
