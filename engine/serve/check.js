const fs = require('fs-extra');
const common = require('../../common');

async function init(){

  console.log('>>> checking app files');

  //prod
  let currentDirectory = process.cwd() + '\\';

  //test
  //let currentDirectory = process.cwd() + '\\akku\\';

  let files = [
    'index.html',
    'compile.js',
    'css',
    'css\\master.css',
    'js',
    'js\\bundle.js',
    'app',
    'app\\index.js'
  ];

  let success = true;
  let failed = [];

  for(var i=0;i<files.length;i++){

    let location = currentDirectory + files[i];

    let check = await fs.access(location,fs.constants.F_OK)
    .then(()=>{
      return true;
    })
    .catch((err)=>{
      return common.error(err);
    });

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
