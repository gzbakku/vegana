const check = require('./check');
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
    common.error('please select a valid platform - electron/cordova/git/wasm');
    platform = await input.select("please select a module",['electron','cordova','wasm','git']);
  }

  if(platform === 'electron'){
    return common.tell("please use the updated config api in the electron section => $$ \"vegana electron config\" $$");
  } else
  if(platform === 'wasm'){
    return wasm.init();
  } else
  if(platform === 'git'){
    return git.init();
  } else
  if(platform === 'cordova'){
    return cordova.init();
  }

}

module.exports= {
  init:init
};
