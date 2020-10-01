const check = require('./check');
const electron = require('./electron/index');
const cordova = require('./cordova/index');
const wasm = require('./wasm/index');
const git = require('./git.js');

async function init(platform){

  if(!platform){
    platform = await input.select("please select a module",['electron','cordova','wasm','git']);
  }

  common.tell('config initiated');

  //check the files

  let doCheck = await check.init();
  if(doCheck == false){
    return common.error('check failed');
  }

  if(
    platform !== 'electron' &&
    platform !== 'cordova' &&
    platform !== 'wasm' &&
    platform !== 'git'
  ){
    return common.error('please select a valid platform - electron/cordova');
  }

  if(platform == 'electron'){
    return electron.init();
  }

  if(platform == 'wasm'){
    return wasm.init();
  }

  if(platform == 'git'){
    return git.init();
  }

  if(platform == 'cordova'){
    return cordova.init();
  }

}

module.exports= {
  init:init
};
