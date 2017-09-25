const waitForExternal = setInterval(() => {
  var user = document.querySelector('#username')
  user.value = "hdd工作室"
  if (document.querySelector('#password')){
    clearInterval(waitForExternal);
    console.log(11111);
  }else{
    console.log('no');
  }
}, 100);