
window.onresize = doLayout;

const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipc = require("electron").ipcRenderer;
var menu = new Menu();
Menu.setApplicationMenu(menu);
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

onload = function() {
    var webview = document.querySelector('webview');

    webview.addEventListener("dom-ready", function(){
        webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
        // webview.openDevTools();
        //https://login.m.taobao.com/login.htm
    });

    doLayout();
    
    document.querySelector('#pause').onclick = function() {
        // t.clearPNSTo()
        // t.getMP().pauseVideo()
        // t.isPaused=true  ytd-video-primary-info-renderer  btn-submit
        //webview.executeJavaScript('document.querySelector("#username").value = "hdd工作室"')
        webview.executeJavaScript('document.querySelector("#J_myNick") != null ? ipc.send("getCookie") : alert("未登录")');
        
      
    };

    // setInterval(()=>{
    //     var name = webview.executeJavaScript('document.querySelector("#J_myNick").innerText');
    //     if(name.length > 0){
    //         alert(name)
    //         ipc.send("loginTB")
    //     } 
    // },5000)

    document.querySelector('#pauseNstart').onclick = function() {
        webview.executeJavaScript('__myYoutubeTools.playNpauseVideo()')
    };

};


function doLayout() {
    var webview = document.querySelector('webview');
    var controls = document.querySelector('#controls');
    var controlsHeight = controls.offsetHeight;
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var webviewWidth = windowWidth;
    var webviewHeight = windowHeight - controlsHeight;

    webview.style.width = webviewWidth + 'px';
    webview.style.height = webviewHeight + 'px';
}

function handleExit(event) {
    console.log(event.type);
    document.body.classList.add('exited');
    if (event.type == 'abnormal') {
        document.body.classList.add('crashed');
    } else if (event.type == 'killed') {
        document.body.classList.add('killed');
    }
}
