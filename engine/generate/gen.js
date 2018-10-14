const common = require('../../common');
const fs = require('fs-extra');

//local modulkes
const check = require('./check');
const copy = require('./copy');
const customize = require('./customize');

module.exports = {
  init:init
};

async function init(type,name){

  //check directory

  let doCheck = await check.init(type,name);

  if(doCheck == false){
    return common.error('check_directory failed');
  }

  let compLocation = doCheck;

  //copy file

  let doCopy = await copy.init(type,compLocation);

  if(doCopy == false){
    return common.error('deploy_file failed');
  }

  let fileLocation = doCopy;

  //customize

  let doCustomize = await customize.init(name,fileLocation);

  if(doCustomize == false){
    return common.error('customize_file failed');
  }

  //return

  return true;

}
