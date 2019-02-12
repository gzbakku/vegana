const fs = require('fs-extra');
const common = require('../../common');

module.exports = {init:init};

async function init(){

  console.log('>>> processing built files');

  let currentDirectory = process.cwd() + '\\';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(var i=0;i<files.length;i++){
    let from = currentDirectory + files[i];
    let to = currentDirectory + 'build//' + files[i];
    let work = await copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + files[i]);
      control = false;
      break;
    }
  }

  return control;

}

async function copy(from,to){

  let copy = await fs.copy(from,to)
  .then(()=>{
    return true;
  })
  .catch((error)=>{
    return common.error(error);
  });

  return copy;

}
