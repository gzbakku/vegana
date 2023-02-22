// const fs = require('fs-extra');
// const common = require('../../common');

async function init(){

  common.tell('checking app files');

  //prod
  let currentDirectory = io.dir.cwd() + '/';

  //test
  //let currentDirectory = process.cwd() + '\\akku\\';

  let files = [
    'index.html',
    'compile.js',
    'lazy.json',
    'css',
    'sass',
    'sass/master.scss',
    'js',
    'app',
    'app/index.js'
  ];

  let success = true;
  let failed = [];

  for(var i=0;i<files.length;i++){
    let location = currentDirectory + files[i];
    let check = await io.exists(location);
    if(check == false){
      success = false;
      failed.push(files[i]);
    }
  }

  if(success == false){
    common.error(failed);
    return common.error('check app files failed for the files given above');
  }

  return true;

}

module.exports = {init:init};
