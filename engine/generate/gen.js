const common = require('../../common');
const wasm = require("./wasm");
const fs = require('fs-extra');

//local modulkes
const check = require('./check');
const copy = require('./copy');
const customize = require('./customize');
const lazy = require('./lazy');

module.exports = {
  init:init
};

async function init(type,name,laziness){

  //check directory

  if(laziness && type == 'comp'){type = 'globalComp';}

  let doCheck = await check.init(type,name);
  if(doCheck == false){
    return common.error('check_directory failed');
  }

  let compLocation = doCheck['location'];
  let pgName = doCheck['page'];
  let cnName = doCheck['cont'];
  let pnName = doCheck['panel'];

  if(type === "wasm"){
    return wasm(name,doCheck.container);
  }

  //copy file
  let doCopy = await copy.init(type,compLocation,name);
  if(doCopy == false){
    return common.error('deploy_file failed');
  }

  let fileLocation = doCopy;

  //customize
  let doCustomize = await customize.init(fileLocation,name,pgName,cnName,pnName,type);
  if(doCustomize == false){
    return common.error('customize_file failed');
  }

  //lazy load
  let doLazy = await lazy.init(laziness,type,name,pgName,cnName,pnName);
  if(doLazy == false){
    return common.error('load_lazy_address failed');
  }

  return true;

}
