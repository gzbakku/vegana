const check = require('./check');
const electron = require('./electron/index');
const cordova = require('./cordova/index');

async function init(platform){

  common.tell('config initiated');

  //check the files

  let doCheck = await check.init();
  if(doCheck == false){
    return common.error('check failed');
  }

  if(platform !== 'electron' && platform !== 'cordova'){
    return common.error('please select a valid platform - electron/cordova');
  }

  if(platform == 'electron'){
    return electron.init();
  }

  if(platform == 'cordova'){
    return cordova.init();
  }

}

module.exports= {
  init:init
};